const sourceManager = require(`../../components/source-manager`)
const html = require(`choo/html`)

module.exports = (functions, state, emit) => html`
  <div>
    <div class="bg-gray-800 sm:p-8 p-4">
      <div>
        <div>
          <nav class="flex justify-end" aria-label="User Status">
            <a href="/unsubscribe" class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200 mr-5" aria-label="Unsubscribe">
              Unsubscribe
            </a>
            <a href="/logout" class="flex items-center text-md font-medium text-gray-200" aria-label="Logout">
              Logout
            </a>
          </nav>
        </div>
      </div>
    </div>
    <div class="">
      ${sourceManager(state, emit)}
    </div>
    <footer class="text-gray-700 text-sm m-3">
      Need help? Have a question? Want to request a service? @madamelic on twitter or maddie@qnzl.co
    </footer>
  </div>
`

