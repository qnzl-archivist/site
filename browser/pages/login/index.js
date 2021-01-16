const implementation = require(`./implementation`)
const html = require(`./html`)

module.exports = (state, emit) => {
  const functions = implementation(state, emit)

  if (!state.login) {
    state.login = {}
  }

  state.getUser()
    .then((user) => {
      if (user.isActive) {
        return emit(`pushState`, `/dashboard`)
      }
    })

  return html(functions, state)
}
