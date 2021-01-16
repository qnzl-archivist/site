const implementation = require(`./implementation`)
const html = require(`./html`)

module.exports = (state, emit) => {
  const functions = implementation(state, emit)

  if (!state.unsubscribe) {
    state.unsubscribe = {}
  }

  fetch(`/api/user/subscription`, {
    method: `DELETE`,
  }).then((res) => {
    state.user = null
    state.services = null

    return emit(`pushState`, `/`)
  })

  return state.loadingMessage
}

