const sourceManager = require(`../../components/source-manager`)
const html = require(`choo/html`)

module.exports = (functions, state, emit) => html`
  <div>
    <div class="bg-gray-800 sm:p-8 p-4">
      <div>
        <div>
          <nav class="sm:hidden flex justify-between" aria-label="Back">
            <a href="/" class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200">
              <i class="text-gray-400 fal fa-chevron-right"></i>
              Back
            </a>
            <a href="/create-subscription" class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200">
              Next
              <i class="text-gray-400 fal fa-chevron-right"></i>
            </a>
          </nav>
          <nav class="hidden sm:flex sm:justify-between" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-4">
              <li>
                <div>
                  <a href="/" class="text-sm font-medium text-gray-400 hover:text-gray-200">Landing</a>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <i class="text-gray-400 fal fa-chevron-right"></i>
                  <a href="/register" aria-current="page" class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200">Create Account</a>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <i class="text-gray-400 fal fa-chevron-right"></i>
                  <a href="/onboarding" class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200 font-bold">Onboarding</a>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <i class="text-gray-400 fal fa-chevron-right"></i>
                  <a href="/create-subscription" aria-current="page" class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200">Subscribe</a>
                </div>
              </li>
            </ol>
            <div>
              <div class="mt-4 lex-shrink-0 flex md:mt-0 md:ml-4">
                <a href="/create-subscription" class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
                  Next
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${sourceManager(state, emit)}
    </div>
  </div>
`
