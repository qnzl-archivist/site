const implementation = require(`./implementation`)
const html = require(`./html`)

module.exports = (state, emit) => {
  if (!state.user) {
    state.getUser()
      .then((user) => {
        state.user = user || { noUser: true }

        if (user && !user.noUser) {
          if (user.isActive) {
            return emit(`pushState`, `/dashboard`)
          }

          return emit(`pushState`, `/onboarding`)
        }
      })
  }

  if (state.subCount === undefined) {
    state.request(`user/sub-count`)
      .then(async (resp) => {
        const {
          subscribedCount,
        } = await resp.json()

        state.subCount = subscribedCount || 0

        emit(`render`)
      })
  }

  const functions = implementation(state, emit)

  return html(functions, state, emit)
}
