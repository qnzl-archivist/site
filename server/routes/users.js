const passport = require(`passport`)
const express = require(`express`)
const Backup = require(`../models/Backup`)
const moment = require(`moment`)
const Stripe = require(`stripe`)
const Token = require(`../models/Token`)
const debug = require(`debug`)(`qnzl:quant:user`)
const User = require(`../models/User`)
const uuid = require(`uuid/v4`)
const getUser = require(`../middleware/get-user`)

const { Magic } = require('@magic-sdk/admin')
const { Strategy: MagicStrategy } = require(`passport-magic`)

const magic = new Magic(process.env.MAGIC_SECRET_KEY)
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

const EARLY_UNLIMITED = `price_1IN1rRAbTrwkPjHcflBcPqZp`
const UNLIMITED = `price_1IN1rRAbTrwkPjHc5W458uBg`

const strategy = new MagicStrategy(async function(user, done) {
  debug(`got user issuer ${user.issuer}`)

  const existingUser = await User.findOne({ issuer: user.issuer })

  if (!existingUser) {
    const userMetadata = await magic.users.getMetadataByIssuer(user.issuer)

    return register(user, userMetadata, done)
  } else {
    return login(user, done)
  }
})

passport.use(strategy)

passport.serializeUser((user, done) => {
  done(null, user.issuer)
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ issuer: id })

    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

const router = express.Router()

const cancel = async (req, res, next) => {
  const currentUser = req.user

  if (!currentUser) {
    return res.sendStatus(401)
  }

  const user = await User.findOne({ _id: currentUser._id })

  try {
    debug(`cancelling subscription ${user.profile.subscriptionId} for ${user._id}`)

    const confirmation = await stripe.subscriptions.del(user.profile.subscriptionId)
  } catch (e) {
    debug(`Error occurred deleting subscription`, e)

    return res.sendStatus(400)
  }

  user.profile = null

  await user.save()

  await Backup.deleteMany({
    user: currentUser._id,
    complete: false,
  })

  await Token.deleteMany({
    user: currentUser._id,
  })

  req.session.destroy(() => {
    debug(`finished cancelling ${user._id}`)

    return res.sendStatus(200)
  })
}

const createSubscription = async (req, res, next) => {
  const {
    user,
    body: {
      token,
    }
  } = req

  // TODO Optional chaining
  if (user.profile && user.profile.subscriptionId) {
    debug(`user has a subscription!`)

    return next()
  }

  debug(`trying to create subscription for new user`)
  const subscribedCount = await User.count({
    [`profile.subscriptionId`]: {
      $exists: true,
    }
  })

  // TODO Do subscription creating
  debug('creating Stripe customer')
  const customer = await stripe.customers.create({
    source: req.body.token,
    metadata: {
      userId: user._id.toString()
    }
  })

  const plan = subscribedCount < 20 ? EARLY_UNLIMITED : UNLIMITED

  debug(`creating \'${plan}\' Stripe subscription`)
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      { plan }
    ],
    metadata: {
      userId: user._id.toString()
    }
  })

  debug(`adding subscription info to user`)
  const updatedUser = await User.updateOne({
    _id: user._id,
  }, {
    $set: {
      profile: {
        subscriptionId: subscription.id,
        customerId: customer.id,
        plan,
        isActive: true,
      }
    }
  })

  debug(`finding tokens to create backups`)
  const tokens = await Token.find({ user: user._id })

  // TODO Get all tokens
  // TODO Create backups
  debug(`found ${tokens.length} tokens for ${user._id}`)
  const promises = tokens.map((token) => {
    return Backup.create({
      complete: false,
      date: moment().add(1, `month`).toDate(),
      service: token._id,
      user: user._id,
    })
  })

  await Promise.all(promises)

  return res.status(200).json(updatedUser)
}

const register = async (user, userMetadata, done) => {
  debug(`creating user`)

  const newUser = await User.create({
    issuer: user.issuer,
    email: userMetadata.email,
    lastLoginAt: user.claim.iat,
  })

  return done(null, newUser)
}

const logout = async (req, res, next) => {
  if (req.isAuthenticated()) {
    await magic.users.logoutByIssuer(req.user.issuer)

    req.logout()

    return res.status(200).end()
  } else {
    return res.status(401).end(`User is not logged in.`)
  }
}

const countEarlySubbers = async (req, res, next) => {
  const subscribedCount = await User.count({
    [`profile.subscriptionId`]: {
      $exists: true,
    }
  })

  return res.json({ subscribedCount })
}

const login = async (user, done) => {
  if (user.claim.iat <= user.lastLoginAt) {
    return done(null, false, {
      message: `Replay attack detected for user ${user.issuer}}.`
    })
  }

  await User.update(
    { issuer: user.issuer },
    { $set: { lastLoginAt: user.claim.iat } }
  )

  return done(null, user)
}

const getSubscription = async (req, res, next) => {
  const currentUser = req.session.user

  if (!currentUser) {
    return res.sendStatus(401)
  }

  const subscription = await stripe.subscriptions.retrieve(currentUser.profile.subscriptionId)
  const customer = await stripe.customers.retrieve(currentUser.profile.customerId)
  const invoice = await stripe.invoices.retrieveUpcoming({
    customer: currentUser.profile.customerId
  })

  return res.json({ subscription, invoice, customer })
}

const refreshSession = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res
      .status(200)
      .json(req.user)
      .end()
  } else {
    return res.status(401).end(`User is not logged in.`)
  }
}

const saveOptions = async (req, res, next) => {
  if (!req.user) {
    return res.sendStatus(401)
  }

  req.user = Object.assign(req.user, req.body)

  await req.user.save()

  return res.status(200).json({
    user: req.user
  })
}

router.get(`/`, refreshSession)
router.post(`/subscribe`, getUser, createSubscription, (req, res) => {
  if (req.user) {
    return res.status(200).json({
      user: req.user
    })
  } else {
    return res.status(401).end('Could not log user in.');
  }
})

router.post(`/`, passport.authenticate(`magic`), (req, res) => {
  if (req.user) {
    return res.status(200).json({
      user: req.user
    })
  } else {
    return res.status(401).end('Could not log user in.');
  }
})

router.delete(`/`, logout)
router.get(`/sub-count`, countEarlySubbers)
router.get(`/subscription`, getSubscription)
router.delete(`/subscription`, cancel)

module.exports = router
