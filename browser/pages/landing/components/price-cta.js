const progressBar = require(`./progress-bar`)
const html = require(`choo/html`)

const possibleValueProps = [
  `Automatic cloud backup for your online data.`,
  `Peace-of-mind for content creators and geeks.`,
  `The ultimate solution for backing up all your online content.`,
  `Storing all of your online content with peace-of-mind`,
]

module.exports = (functions, state) => html`
  <div class="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
    <div class="p-6">
      <h1 class="font-extrabold text-2xl text-gray-800">Become a founding member</h1>
      <p class="mt-8">
        <div class="flex-inline">
          <span class="text-4xl font-extrabold text-gray-900">$20</span>
          <span class="text-base font-medium text-gray-500">/year</span>
        </div>
        <div>
          <span class="text-base font-medium text-gray-500">Early adopter price, locked-in forever</span>
          <span class="text-base font-medium text-gray-500">${state.subCount}/20 spots claimed!</span>
        </div>
      </p>
      <div class="mt-2">
        ${progressBar(state.subCount)}
      </div>
      <a href="/register" class="mt-8 block w-full bg-purple-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-purple-700">Protect my data</a>
    </div>
    <div class="pt-6 pb-8 px-6">
      <h3 class="text-xs font-medium text-gray-900 tracking-wide uppercase">How we will say thanks:</h3>
      <ul class="mt-6 space-y-4">
        <li class="flex space-x-3">
          <!-- Heroicon name: check -->
          <svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm text-gray-500">
            Early access to new archivers.
          </span>
        </li>

        <li class="flex space-x-3">
          <!-- Heroicon name: check -->
          <svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm text-gray-500">
            Beta access to future no-code tools, to manipulate and use your data.
          </span>
        </li>

        <li class="flex space-x-3">
          <!-- Heroicon name: check -->
          <svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm text-gray-500">
            Free access to any future higher tier plan (indefinite and expanded storage, premium archivers, and more!).
          </span>
        </li>
      </ul>
    </div>
  </div>
`
