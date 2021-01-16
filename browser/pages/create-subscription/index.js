const implementation = require(`./implementation`)
const html = require(`./html`)

module.exports = (state, emit) => {
  const functions = implementation(state, emit)

  if (!state.createsubscription) {
    state.createsubscription = {}
  }

  $(document).ready(() => {
    // TODO Replace with correct key
    stripe = Stripe(`pk_live_51IKnj7AbTrwkPjHc48ODt4ehXLJpQxcZbkyJHSDghTng1O3SEqQdiFjUnpKXA4oFqO2JsUqw9teOhG0gjb6Gtj6Z0003uUsaLx`)

    state.stripe = stripe

    const elements = stripe.elements()
    const style = {
      base: {
        fontSize: '16px',
        color: '#32325d',
      },
    }

    if ($('#card-element').length) {
      if (!state.card) {
        state.card = elements.create('card', { style })
      }

      state.card.mount('#card-element')
    }
  })

  state.getUser()
    .then((user) => {
      if (user.isActive) {
        return emit(`pushState`, `/dashboard`)
      }
    })

  return html(functions, state)
}

