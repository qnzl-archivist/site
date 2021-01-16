const html = require(`choo/html`)

const register = (functions, state) => html`
  <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg" alt="Workflow">
      </div>
      <form class="mt-8" onsubmit=${functions.login}>
        <div class="text-md flex justify-center text-gray-700">
        </div>
        <div class="rounded-md shadow-sm mt-3">
          <div>
            <input aria-label="Email address" name="email" type="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email address">
          </div>
        </div>
        <div class="inline-flex mt-3 text-gray-600 text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mr-1 h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Archivist uses password-less auth, don't worry about passwords. :)
        </div>
        <div class="mt-2 text-sm">
          <div class="text-red-600 ${!state.register.error && `dn`}">
            ${state.register.error}
          </div>
          <div class="text-green-600 ${!state.register.success && `dn`}">
            ${state.register.success}
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" id="join-button" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
              Join
          </button>
        </div>
      </form>
    </div>
  </div>
`

module.exports = (functions, state) => html`
  <div>
    <div class="bg-gray-800 sm:p-8 p-4">
      <div>
        <div>
          <nav class="sm:hidden flex justify-between" aria-label="Back">
            <a href="/" class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200">
              <i class="text-gray-400 fal fa-chevron-right"></i>
              Back
            </a>
            <a href="/onboarding" class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200">
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
                  <a href="/register" class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200 font-bold">Create Account</a>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <i class="text-gray-400 fal fa-chevron-right"></i>
                  <a href="/onboarding" aria-current="page" class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200">Onboarding</a>
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
                <a href="/register" class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
                  Next
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${register(functions, state)}
    </div>`

