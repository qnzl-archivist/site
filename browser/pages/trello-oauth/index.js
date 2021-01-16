const implementation = require(`./implementation`)
const chooHtml = require(`choo/html`)
const html = require(`./html`)

module.exports = (state, emit) => {
  const functions = implementation(state, emit)

  const [ _, token ] = state.params.id.split(`=`)

  fetch(`/api/service/trello/callback`, {
      method: `POST`,
      headers: {
        [`Content-Type`]: `application/json`,
      },
      body: JSON.stringify({
        token,
      })
    })
    .then((resp) => {
      if (resp.ok) {
        return emit(`pushState`, `/`)
      }
    })

  return html(functions, state, emit)
}

