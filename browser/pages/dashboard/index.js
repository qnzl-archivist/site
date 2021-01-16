const implementation = require(`./implementation`)
const chooHtml = require(`choo/html`)
const html = require(`./html`)

module.exports = (state, emit) => {
  if (!state.user) {
    state.getUser()
      .then((user) => {
        if (user.noUser) {
          return emit(`pushState`, `/register`)
        }

        if (!user.isActive) {
          return emit(`pushState`, `/onboarding`)
        }
      })
  }

  const functions = implementation(state, emit)

  return html(functions, state, emit)
}

