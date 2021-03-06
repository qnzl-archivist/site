const html = require(`choo/html`)

module.exports = (functions, state) => html`
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg" alt="Workflow">
      </div>
      <form class="mt-8" onsubmit=${functions.createSubscription}>
        <div class="text-md flex justify-center text-gray-700">
          $20 / year for unlimited monthly backups
        </div>
        <div class="rounded-md shadow-sm mt-3">
          <div class="mt-2">
            <span id="card-element" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5">
          </div>
        </div>
        <div class="inline-flex mt-3 text-gray-600 text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mr-1 h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Archivist uses Stripe as our payment processor
        </div>
        <div class="mt-2 text-sm">
          <div class="text-red-600 ${!state.createsubscription.error && `dn`}">
            ${state.createsubscription.error}
          </div>
          <div class="text-green-600 ${!state.createsubscription.success && `dn`}">
            ${state.createsubscription.success}
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            <span id="join-button">
              Start monthly backups
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
`

