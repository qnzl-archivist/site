const html = require(`choo/html`)

module.exports = (functions, state, components) => html`
  <div class="relative bg-gray-800 overflow-hidden">
    <div class="hidden sm:block sm:absolute sm:inset-0" aria-hidden="true">
      <svg class="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-gray-700 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0" width="364" height="384" viewBox="0 0 364 384" fill="none">
        <defs>
          <pattern id="eab71dd9-9d7a-47bd-8044-256344ee00d0" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="364" height="384" fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)" />
      </svg>
    </div>
    <div class="relative pt-6 pb-16 sm:pb-24">
      <nav class="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6" aria-label="Global">
        <div class="flex items-center flex-1">
          <div class="flex items-center justify-between w-full md:w-auto">
            <a href="/">
              <span class="sr-only">Archivist</span>
              <svg class="h-8 text-white w-auto sm:h-10" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="brain" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512"><path fill="currentColor" d="M509.6 230.3c17.5-54.5-20.1-93.2-41.1-105.3 2.7-37.7-25.9-74.3-66.7-79.4C390 18.2 362.8 0 332.2 0 307.6 0 286 11.9 272 29.9 258 11.9 236.4 0 211.8 0c-30.6 0-57.7 18.2-69.7 45.6-40.8 5.1-69.3 41.7-66.7 79.4-21 12.2-58.6 50.9-41.1 105.3C12.9 247.4 0 273.4 0 301c0 32.7 17.4 62.4 45.3 78.5-2.3 48.2 36.7 88.7 84.9 87.4 14.2 27.4 42.6 45 74.1 45 27.9 0 52.5-13.8 67.8-34.8 15.2 21 39.9 34.8 67.8 34.8 31.5 0 59.8-17.6 74-45 48.2 1.2 87.2-39.3 84.9-87.4 27.9-16.2 45.3-45.8 45.3-78.5-.1-27.6-13-53.6-34.5-70.7zM255.9 428.5c0 28.4-23.2 51.5-51.7 51.5-31.9 0-44.2-21.8-53.1-48.2-16.3 2.7-18.3 3.2-22.2 3.2-28.5 0-51.7-23.1-51.7-51.5 0-6.2.9-9.1 3.7-23C55.5 350 32.1 336.3 32.1 301c0-33.9 23-46.9 42.9-58.3-12.6-25.7-12.8-29.2-12.8-39.2 0-33.9 21.9-48.5 49.4-59.7-2.5-10.9-4.2-16.6-4.2-22.8 0-24.1 19.6-43.8 45.5-43.8h.4l12.7.3c5.9-22.9 15-45.5 45.8-45.5 24.3 0 44.2 19.7 44.2 44v352.5zm207.1-68c2.8 13.8 3.7 16.8 3.7 23 0 28.4-23.2 51.5-51.7 51.5-3.9 0-5.9-.5-22.2-3.2-8.9 26.4-21.2 48.2-53.1 48.2-28.5 0-51.7-23.1-51.7-51.5V76c0-24.3 19.8-44 44.2-44 30.7 0 39.9 22.5 45.8 45.5l12.7-.3h.4c25.9 0 45.5 19.7 45.5 43.8 0 6.2-1.7 11.9-4.2 22.8 27.5 11.2 49.4 25.8 49.4 59.7 0 10-.2 13.4-12.8 39.2 19.9 11.4 42.9 24.5 42.9 58.3 0 35.3-23.4 49-48.9 59.5z"/></svg>
            </a>
          </div>
        </div>
        <div class="hidden md:flex">
          <a href="/login" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
            Log in
          </a>
        </div>
      </nav>

      <main class="mt-12 sm:mt-18">
        <div class="mx-auto max-w-7xl">
          <div class="lg:grid lg:grid-cols-12 lg:gap-8">
            <div class="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
              <div>
                <h1 class="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                  <span class="md:block">Prevent your content</span>
                  <span class="text-indigo-400 md:block">from disappearing</span>
                </h1>
                <p class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  From periodic social media cleaning to unforeseen events, you can be sure that Archivist will always have a copy of your online content.
                </p>
              </div>
            </div>
            <div class="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
              <div class="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                <div class="px-4 py-8 sm:px-10">
                  ${components[0](functions, state)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
`
