const tippy = require(`tippy.js`)
const day = require(`dayjs`)

module.exports = (app) => {
  app.use(async (state) => {
    const util = {}

    util.toCapitalCase = str => str.toUpperCase().slice(0, 1)[0] + str.slice(1)

    util.tooltip = (content) => {
      const span = document.createElement(`span`)
      span.innerHTML = `<img class="pl1 w1 h1" src="/img/info-circle.svg">`

      tippy(span, { content })
      return span
    }

    util.formatDate = (date) => {
      const formattedDate = day(date).format(`YYYY-MM-DD HH:mm:ss A`)

      return formattedDate
    }

    state.util = util
  })
}
