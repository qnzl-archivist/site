const debug = require(`debug`)(`qnzl:archive:get-user`)
const User = require(`../models/User`)

module.exports = async (req, res, next) => {
  if (req.session.user && !req.user) {
    debug(`getting user from session`)

    // TODO Refresh session user
    req.user = req.session.user
  }

  if (!req.user) {
    debug(`no user found!`)
    return res.sendStatus(401)
  }

  return next()
}
