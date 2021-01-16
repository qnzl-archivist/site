const express = require(`express`)
const fetch = require(`node-fetch`)
const debug = require(`debug`)(`qnzl:archiver:service:trello`)
const User = require(`../../models/User`)
const getUser = require(`../../middleware/get-user`)
const Vogel = require(`vogel`)
const Token = require(`../../models/Token`)
const Backup = require(`../../models/Backup`)
const moment = require(`moment`)

const router = express.Router()

const {
  TRELLO_CONSUMER_KEY,
  TRELLO_CONSUMER_SECRET,
  TRELLO_OAUTH_CALLBACK,
} = process.env

const unlink = async (req, res, next) => {
  debug(`unlinking trello`)

  const removed = await Token.remove({
    user: req.user._id,
    serviceName: `trello`,
  })

  return res.sendStatus(200)
}

const oauthFirstLeg = async (req, res, next) => {
  debug(`start oauth for trello`)

  const returnUrl = encodeURI(`${TRELLO_OAUTH_CALLBACK}/trello-oauth`)

  const url = `https://trello.com/1/authorize?expiration=never&name=archivist&scope=read&response_type=token&key=${TRELLO_CONSUMER_KEY}&callback_method=fragment&return_url=${returnUrl}`

  return res.redirect(url)
}

const oauthSecondLeg = async (req, res, next) => {
  try {
    debug(`finishing oauth for trello`)

    const {
      token
    } = req.body

    const createdToken = await Token.create({
      user: req.user._id,
      serviceName: `trello`,
      accessToken: token,
      refreshToken: null,
      // Token never expires
      expiresAt: moment(`2999-01-01`).toDate(),
    })

    if (req.user.profile && req.user.profile.isActive) {
      // Create scheduled backup
      const backup = await Backup.create({
        complete: false,
        date: moment().add(1, `month`).toDate(),
        service: createdToken._id,
        user: req.user._id,
      })

      return res.redirect(`/dashboard`)
    }

    return res.redirect(`/onboarding`)
  } catch (error) {
    console.error(`Error occurred finishing trello link`, error)

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
    serviceName: `trello`
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
    serviceName: `trello`,
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
router.post(`/callback`, getUser, oauthSecondLeg)
router.post(`/backup`, getUser, doBackup)

module.exports = router

