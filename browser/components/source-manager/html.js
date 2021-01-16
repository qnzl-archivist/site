const dayjs = require(`dayjs`)
const html = require(`choo/html`)

module.exports = (functions, state) => {
  const {
    linked: activeLinked,
    name: activeName,
    scopes: activeScopes,
    backups: activeBackups,
    message: activeMessage,
    nextScheduled: activeNextScheduled,
    backupInProgress: activeBackingUp,
  } = state.activeService

  return html`
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="h-screen flex overflow-hidden">
      <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
      <div class="${!state.sidebarOpen && `hidden`}">
        <div class="fixed inset-0 flex z-40">
          <div class="fixed inset-0">
            <div class="absolute inset-0 opacity-75"></div>
          </div>
          <div class="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button onclick=${functions.toggleSidebar} class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span class="sr-only">Close sidebar</span>
                <!-- Heroicon name: outline/x -->
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <nav class="mt-5 px-2 space-y-1">
                <!-- Current: "text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                ${(() => {
                  return Object.keys(state.services).map((serviceName) => {
                    const service = state.services[serviceName]

                    return html`
                      <a onclick=${!service.comingSoon && functions.openService(serviceName)} title="Link with ${service.name}" style="background-color:${service.bgColor}" class="text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
                        <div class="relative px-6 py-5 flex items-center space-x-3 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                          <div class="flex-shrink-0">
                            <i class="text-white fab fa-${!service.comingSoon && serviceName} fa-2x"></i>
                          </div>
                          <div class="flex-1 min-w-0">
                              <p class="text-sm font-medium">
                                ${serviceName} ${service.comingSoon && `(Coming soon!)`}
                              </p>
                          </div>
                        </div>
                      </a>
                    `
                  })
                })()}
              </nav>
            </div>
          </div>
          <div class="flex-shrink-0 w-14">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </div>

      <!-- Static sidebar for desktop -->
      <div class="hidden md:flex md:flex-shrink-0">
        <div class="flex flex-col w-64">
          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <div class="flex flex-col h-0 flex-1">
            <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav class="mt-1 flex-1 px-2 space-y-1">
                ${(() => {
                  return Object.keys(state.services).map((serviceName) => {
                    const service = state.services[serviceName]

                    return html`
                      <a onclick=${!service.comingSoon && functions.openService(serviceName)} title="Link with ${service.name}" style="background-color:${service.bgColor}" class="text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        <div class="relative px-6 py-5 flex items-center space-x-3 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                          <div class="flex-shrink-0">
                          </div>
                          <div class="flex-1 min-w-0">
                              <p class="text-sm font-medium">
                                ${serviceName} ${service.comingSoon && `(Coming soon!)`}
                              </p>
                          </div>
                        </div>
                      </a>
                    `
                  })
                })()}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-0 flex-1 overflow-hidden">
        <div class="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button onclick=${functions.toggleSidebar} class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="sr-only">Open sidebar</span>
            <!-- Heroicon name: outline/menu -->
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabindex="0">
          <div>
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
              <div class="mt-6 min-w-0 inline-flex">
                <h1 class="text-2xl font-bold text-gray-900 truncate">
                  ${activeName}
                </h1>
                <button onclick=${functions.linkService} id="link-button" type="button" class="ml-3 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <span id="link-button-text">${activeLinked ? `Disconnect` : `Connect`}</span>
                </button>
                ${(() => {
                  if (activeLinked && activeBackingUp) {
                    return html`
                      <div class="ml-3 px-4 py-2 text-gray-600">
                        <span>Backup in progress...</span>
                      </div>
                    `
                  }

                  if (activeLinked) {
                    return html`
                      <button onclick=${functions.requestBackup} type="button" class="ml-3 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-100 bg-indigo-500">
                        <span>Backup</span>
                      </button>
                    `
                  }
                })()}
              </div>
              <div class="mt-2 ${(!activeLinked || !activeNextScheduled) && `hidden`}">
                Next backup on: ${dayjs(activeNextScheduled).format(`MMM D, YYYY`)}
              </div>
            </div>
          </div>

          <div class="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden rounded-lg">
              <div class="px-1 pt-2 sm:px-1 text-lg">
                What to back-up
              </div>
              <div class="px-3 pt-2 sm:p-2 text-sm">
                ${(() => {
                  return activeScopes.map(({ name, friendlyName, checked, info }) => {
                    return html`
                      <div>
                        <input onchange=${functions.changeServiceScope} type="checkbox" name=${name} ${checked && `checked`} />
                        <span class="ml-1">${friendlyName}</span>
                        <i class="text-black fal fa-${info && `info-circle`}" title="${info}"></i>
                      </div>
                    `
                  })
                })()}
              </div>
              <div class="text-green-700">
                ${activeMessage}
              </div>
            </div>
          </div>

          <div class="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden rounded-lg">
              <div class="px-1 pt-2 sm:px-1 text-lg">
                Archives
              </div>
              <div class="px-4 pt-2 sm:p-2 text-sm">
                <ul>
                  ${(() => {
                    if (activeBackups.length === 0) {
                      return html`<div class="text-gray-500">No archives found.</div>`
                    }

                    return activeBackups.map((archive) => {
                      const {
                        date,
                        _id: id,
                      } = archive

                      return html`
                        <li>
                          <a href="#" id="${id}" onclick=${functions.downloadArchive(id)}>
                            <i class="fal fa-cloud-download fa-lg"></i>
                            <span class="underline">${dayjs(date).format(`MMM D, YYYY @ HH:mm`)}</span>
                          </a>
                        </li>
                      `
                    })
                  })()}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

  `
}
