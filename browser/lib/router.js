const dashboard = require(`../pages/dashboard`)
const register = require(`../pages/register`)
const onboarding = require(`../pages/onboarding`)
const createSubscription = require(`../pages/create-subscription`)
const landing = require(`../pages/landing`)
const login = require(`../pages/login`)
const logout = require(`../pages/logout`)
const unsubscribe = require(`../pages/unsubscribe`)
const services = require(`../pages/services`)
const privacy = require(`../pages/privacy`)
const trelloOAuth = require(`../pages/trello-oauth`)

module.exports = (app) => {
  app.route(`/trello-oauth/:id`, trelloOAuth)
  app.route(`/dashboard`, dashboard)
  app.route(`/onboarding`, onboarding)
  app.route(`/unsubscribe`, unsubscribe)
  app.route(`/register`, register)
  app.route(`/login`, login)
  app.route(`/services`, services)
  app.route(`/privacy`, privacy)
  app.route(`/logout`, logout)
  app.route(`/create-subscription`, createSubscription)
  app.route(`/`, landing)
}