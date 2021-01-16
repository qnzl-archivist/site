const cookieParser = require(`cookie-parser`)
const compression = require(`compression`)
const bodyParser = require(`body-parser`)
const mongoose = require(`mongoose`)
const passport = require(`passport`)
const ecstatic = require(`ecstatic`)
const express = require(`express`)
const session = require(`express-session`)
const minify = require(`mollify`)
const debug = require(`debug`)(`qnzl:archiver:app`)
const path = require(`path`)

const User = require(`./models/User`)

const MongoStore = require(`connect-mongo`)(session)

const app = express()
const router = express.Router()

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
})

app.use(bodyParser.json())
app.use(cookieParser())
app.use(compression())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`)
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`)
  res.header(`Access-Control-Allow-Headers`, `Content-Type`)

  next()
})

router.use(`/api/user`, require(`./routes/users`))
router.use(`/api/service`, require(`./routes/services`))

app.use(router)

app.use(ecstatic({
  root: `${__dirname}/../public`,
  cache: `max-age=86400`
}))

// All other routes
router.use(`*`, (req, res, next) => {
  if (req.baseUrl.indexOf(`.`) > -1) {
    return next()
  }

  // What routes to respond with index.html with
  const publicRoutes = [
    new RegExp(`/login`),
    new RegExp(`/privacy`),
    new RegExp(`/logout`),
    new RegExp(`/create-subscription`),
    new RegExp(`/dashboard`),
    new RegExp(`/register`),
    new RegExp(`/onboarding`),
    new RegExp(`/trello-oauth`)
  ]

  const match = publicRoutes.some(route => route.test(req.baseUrl))

  if (match) {
    debug(`returning index.html`)
    return res.sendFile(path.join(__dirname, `../public`, `index.html`))
  }

  return next()
})

app.use((err, req, res, next) => {
  if (err) {
    console.error(`Error occurred: `, err)
    res.statusCode = 500
    return res.send(err)
  }

  res.end()
  return next()
})

module.exports = app
