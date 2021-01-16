const express = require(`express`)
const fetch = require(`node-fetch`)
const debug = require(`debug`)(`qnzl:archiver:service:youtube`)
const User = require(`../../models/User`)
const getUser = require(`../../middleware/get-user`)
const { google } = require('googleapis')
const Token = require(`../../models/Token`)
const Backup = require(`../../models/Backup`)
const moment = require(`moment`)

const router = express.Router()

const {
  YOUTUBE_CLIENT_ID,
  YOUTUBE_CLIENT_SECRET,
  YOUTUBE_OAUTH_CALLBACK,
} = process.env

const unlink = async (req, res, next) => {
  debug(`unlinking youtube`)

  const removed = await Token.remove({
    user: req.user._id,
    serviceName: `youtube`,
  })

  return res.sendStatus(200)
}

const oauthFirstLeg = async (req, res, next) => {
  debug(`start oauth for youtube`)
  const yt = new google.auth.OAuth2(
    YOUTUBE_CLIENT_ID,
    YOUTUBE_CLIENT_SECRET,
    YOUTUBE_OAUTH_CALLBACK,
  )

  const url = yt.generateAuthUrl({
    access_type: `offline`,
    scope: [
      `https://www.googleapis.com/auth/youtube.readonly`,
    ],
  })

  return res.redirect(url)
}

const oauthSecondLeg = async (req, res, next) => {
  try {
    const yt = new google.auth.OAuth2(
      YOUTUBE_CLIENT_ID,
      YOUTUBE_CLIENT_SECRET,
      YOUTUBE_OAUTH_CALLBACK,
    )

    const {
      code,
    } = req.query

    const {
      user,
    } = req;

    const tokens = await yt.getToken(code)

    const {
      tokens: {
        access_token: accessToken,
        refresh_token: refreshToken,
        expiry_date: expiresAt,
      }
    } = tokens

    const token = await Token.create({
      user: req.user._id,
      serviceName: `youtube`,
      accessToken,
      refreshToken,
      expiresAt,
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
    console.error(`Error occurred finishing youtube link`, error)

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
    serviceName: `youtube`
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
    serviceName: `youtube`,
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

