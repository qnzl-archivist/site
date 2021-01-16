const getUser = require(`../../middleware/get-user`)
const express = require(`express`)
const moment = require(`moment`)
const Token = require(`../../models/Token`)
const Backup = require(`../../models/Backup`)
const fs = require(`fs`)

const {
  promisify,
} = require(`util`)

const router = express.Router()

// TODO Dont put requires here
router.use(`/twitter`, require(`./twitter`))
router.use(`/youtube`, require(`./youtube`))
router.use(`/trello`, require(`./trello`))
router.use(`/todoist`, require(`./todoist`))

router.get(`/`, getUser, async (req, res, next) => {
  if (!req.user) {
    return res.sendStatus(401)
  }

  const tokens = await Token.find({
    user: req.user._id,
  })

  const populatedTokensPromises = tokens.map(async (token) => {
    token = token.toObject()
    const upcomingBackups = await Backup.find({
      user: token.user,
      service: token._id,
      $or: [
        { complete: false },
        { complete: { $exists: false } },
      ],
    }).sort({ date: -1 })

    const completeBackups = await Backup.find({
      user: token.user,
      service: token._id,
      complete: true,
      url: {
        $exists: true,
      },
    })

    const nextScheduledBackup = upcomingBackups.find(({ adhoc }) => {
      return !adhoc
    })

    const inProgressBackup = upcomingBackups.find(({ date }) => {
      return moment().isAfter(moment(date))
    })

    token.nextScheduled = nextScheduledBackup && nextScheduledBackup.date
    token.backupInProgress = inProgressBackup
    token.backups = completeBackups

    return token
  })

  const populatedTokens = await Promise.all(populatedTokensPromises)

  return res.json(populatedTokens)
})

router.get(`/download-backup/:id`, async (req, res, next) => {
  const backup = await Backup.findOne({
    user: req.user._id,
    _id: req.params.id,
  })

  if (!backup) {
    return res.sendStatus(403)
  }

  const file = await promisify(fs.readFile)(backup.url, `utf8`)

  return res.send(file)
})

module.exports = router
