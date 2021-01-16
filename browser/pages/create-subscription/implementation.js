const getFormData = require(`get-form-data`)

module.exports = (state, emit) => {
  const functions = {}

  functions.createSubscription = async (e) => {
    e.preventDefault()

    $(`#join-button`).addClass(`dot-flashing`).text(``)
    const {
      token: {
        id: token
      },
    } = await state.stripe.createToken(state.card)

    const response = await state.request(`user/subscribe`, {
      method: `POST`,
      body: {
        token,
      }
    })

    $(`#join-button`).removeClass(`dot-flashing`).text('Start monthly backups')

    if (response.ok) {
      const { user } = await response.json()

      // Clear services so we refresh info
      state.services = null

      state.user = user

      return emit(`pushState`, `/dashboard`)
    }

    return emit(`render`)
  }

  return functions
}

