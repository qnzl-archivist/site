const express = require(`express`)
const fetch = require(`node-fetch`)
const debug = require(`debug`)(`qnzl:archiver:service:twitter`)
const User = require(`../../models/User`)
const getUser = require(`../../middleware/get-user`)
const Vogel = require(`vogel`)
const Token = require(`../../models/Token`)
const Backup = require(`../../models/Backup`)
const moment = require(`moment`)

const router = express.Router()

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_OAUTH_CALLBACK,
} = process.env

const unlink = async (req, res, next) => {
  debug(`unlinking twitter`)

  const removed = await Token.remove({
    user: req.user._id,
    serviceName: `twitter`,
  })

  return res.sendStatus(200)
}

const oauthFirstLeg = async (req, res, next) => {
  debug(`start oauth for twitter`)

  const twitter = new Vogel({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    oauthCallback: TWITTER_OAUTH_CALLBACK,
  })

  const url = await twitter.getRequestToken()

  return res.redirect(url)
}

const oauthSecondLeg = async (req, res, next) => {
  try {
    const twitter = new Vogel({
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
    })

    debug(`finishing oauth for twitter`)

    const {
      oauth_token: requestToken,
      oauth_verifier: verifier
    } = req.query

    const body = await twitter.getAccessToken(requestToken, verifier)

    const {
      accessToken,
      accessTokenSecret
    } = body

    const token = await Token.create({
      user: req.user._id,
      serviceName: `twitter`,
      accessToken,
      refreshToken: accessTokenSecret,
      // TODO Figure out
      expiresAt: 0,
    })

    if (req.user.profile && req.user.profile.isActive) {
      // Create scheduled backup
      const backup = await Backup.create({
        complete: false,
        date: moment().add(1, `month`).toDate(),
        service: token._id,
        user: user._id,
      })

      return res.redirect(`/dashboard`)
    }

    return res.redirect(`/onboarding`)
  } catch (error) {
    console.error(`Error occurred finishing twitter link`, error)

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
    serviceName: `twitter`
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
    serviceName: `twitter`,
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

