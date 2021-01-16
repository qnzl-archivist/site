const html = require(`choo/html`)

module.exports = (progress) => html`
  <div class="h-3 relative max-w-xl rounded-full overflow-hidden">
    <div class="w-full h-full bg-gray-200 absolute"></div>
    <div class="h-full bg-green-300 absolute" style="width:${progress}%"></div>
  </div>
`
