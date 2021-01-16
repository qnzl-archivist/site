const implementation = require(`./implementation`)
const chooHtml = require(`choo/html`)
const html = require(`./html`)

module.exports = (state, emit) => {
  const functions = implementation(state, emit)

  return html(functions, state, emit)
}
