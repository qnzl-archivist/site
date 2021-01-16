const { Magic } = require(`magic-sdk`)
const html = require(`choo/html`)

module.exports = (app) => {
  app.use(async (state, emitter) => {
    // pk_live_350C49090DAE2715
    state.magic = new Magic('pk_test_CCC42C00D3F81713')

    emitter.on(`message`, (type, msg, componentName) => {
      if (!state[componentName]) {
        state[componentName] = {}
      }

      state[componentName][type] = msg

      setTimeout(() => {
        state[componentName][type] = null

        // return emitter.emit('render')
      }, 4000)

      return emitter.emit(`render`)
    })

    state.loadingMessage = html`
      <div class="dot-spin">
      </div>
    `
    state.getUser = () => {
      return fetch(`/api/user`)
        .then(async (resp) => {
          if (resp.ok) {
            const user = await resp.json()

            state.user = user

            state.user.isActive = await state.userHasSubscription()

            return user
          }

          return { noUser: true }
        })
    }

    state.userHasSubscription = async () => {
      let user = state.user
      if (!user) {
        user = await state.getUser()
      }

      return user && user.profile && user.profile.subscriptionId && user.profile.isActive
    }
  })
}
