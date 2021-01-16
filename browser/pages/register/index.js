const implementation = require(`./implementation`)
const html = require(`./html`)

module.exports = (state, emit) => {
  const functions = implementation(state, emit)

  if (!state.register) {
    state.register = {}
  }

  if (!state.user) {
    state.getUser()
      .then((user) => {
        if (!user.noUser && user.isActive) {
          return emit(`pushState`, `/dashboard`)
        }
      })
  }

  return html(functions, state)
}

