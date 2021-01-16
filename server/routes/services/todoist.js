const express = require(`express`)
const fetch = require(`node-fetch`)
const debug = require(`debug`)(`qnzl:archiver:service:todoist`)
const User = require(`../../models/User`)
const getUser = require(`../../middleware/get-user`)
const Vogel = require(`vogel`)
const Token = require(`../../models/Token`)
const Backup = require(`../../models/Backup`)
const moment = require(`moment`)

const router = express.Router()

const {
  TODOIST_CLIENT_ID,
  TODOIST_CLIENT_SECRET,
  TODOIST_OAUTH_CALLBACK,
} = process.env

const unlink = async (req, res, next) => {
  debug(`unlinking todoist`)

  const removed = await Token.remove({
    user: req.user._id,
    serviceName: `todoist`,
  })

  return res.sendStatus(200)
}

const oauthFirstLeg = async (req, res, next) => {
  debug(`start oauth for todoist`)

  const url = `https://todoist.com/oauth/authorize?client_id=${TODOIST_CLIENT_ID}&scope=data:read&state=${Number(new Date())}`

  return res.redirect(url)
}

const oauthSecondLeg = async (req, res, next) => {
  try {
    debug(`finishing oauth for todoist`)

    const { code } = req.query

    const body = new URLSearchParams()
    body.append(`code`, code)
    body.append(`grant_type`, `authorization_code`)
    body.append(`client_id`, TODOIST_CLIENT_ID)
    body.append(`client_secret`, TODOIST_CLIENT_SECRET)
    body.append(`redirect_uri`, TODOIST_OAUTH_CALLBACK)

    fetch(`https://todoist.com/oauth/access_token`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/x-www-form-urlencoded; charset=UTF-8`
        },
        body
      })
      .then(async (response) => {
        const _token = await response.json()

        const {
          refresh_token,
          expires_in,
          access_token,
        } = _token

        const token = await Token.create({
          user: req.user._id,
          serviceName: `todoist`,
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresAt: moment().add(1, `week`).toDate(),
        })

        if (req.user.profile && req.user.profile.isActive) {
          // Create scheduled backup
          const backup = await Backup.create({
            complete: false,
            date: moment().add(1, `month`).toDate(),
            service: token._id,
            user: req.user._id,
          })

          return res.redirect(`/dashboard`)
        }

        return res.redirect(`/onboarding`)
      })

  } catch (error) {
    console.error(`Error occurred finishing todoist link`, error)

    return res.sendStatus(500)
  }
}

const changeScope = async (req, res, next) => {
  const {
    body: {
      scopes,
    },
    user,
  } = req

  const updatedUser = await Token.updateOne({
    user: user._id,
    serviceName: `todoist`
  }, {
    $set: {
      scopes,
    },
  })

  return res.sendStatus(200)
}

const doBackup = async (req, res, next) => {
  const { user } = req

  const token = await Token.findOne({
    user: user._id,
    serviceName: `todoist`,
  })

  const backup = await Backup.create({
    complete: false,
    adhoc: true,
    date: moment().subtract(1, `hour`).toDate(),
    service: token._id,
    user: user._id,
  })

  return res.json(backup)
}

router.put(`/scopes`, getUser, changeScope)
router.delete(`/`, getUser, unlink)
router.get(`/`, getUser, oauthFirstLeg)
router.get(`/callback`, getUser, oauthSecondLeg)
router.post(`/backup`, getUser, doBackup)

module.exports = router

