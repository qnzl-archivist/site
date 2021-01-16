const chooDevtools = require(`choo-devtools`)
const choo = require(`choo`)

const app = choo()

app.use(chooDevtools())

require(`./lib/router`)(app)
require(`./lib/global`)(app)
require(`./lib/util`)(app)
require(`./lib/request`)(app)

app.mount(`div`)
