const centeredFeatures = require(`./components/centered-features`)
const embedBoxHero = require(`./components/embed-box-hero`)
const basicBetaCTA = require(`./components/basic-beta-cta`)
const priceCTA = require(`./components/price-cta`)
const sourceManager = require(`../../components/source-manager`)
const footer = require(`./components/footer`)

const html = require(`choo/html`)

const heroComponents = [
 priceCTA,
]

module.exports = (functions, state, emit) => html`
  <div>
    ${embedBoxHero(functions, state, heroComponents)}
    ${centeredFeatures(functions, state)}
    ${basicBetaCTA(functions, state)}
    ${footer(functions, state)}
  </div>
`
