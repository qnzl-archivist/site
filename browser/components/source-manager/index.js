const implementation = require(`./implementation`)
const html = require(`./html`)

module.exports = (state, emit) => {
  const functions = implementation(state, emit)

  if (!state.services) {
    fetch(`/api/service/`)
      .then(async (resp) => {
        if (resp.ok) {
          const linkedServices = await resp.json()

          linkedServices.map((linkedService) => {
            const {
              serviceName,
              scopes,
              backupInProgress,
              backups,
              nextScheduled,
            } = linkedService

            const service = state.services[serviceName]

            service.nextScheduled = nextScheduled
            service.backupInProgress = backupInProgress && backupInProgress.date
            service.backups = backups

            service.scopes.map((scope) => {
              if (scopes.includes(scope.name)) {
                scope.checked = true
              }
            })

            service.linked = true
          })

          return emit(`render`)
        }
      })

    state.services = {
      twitter: {
        name: `twitter`,
        bgColor: `#1DA1F2`,
        linked: false,
        scopes: [
          {
            friendlyName: `Your Tweets`,
            name: `personal`,
          },
          {
            friendlyName: `Your Timeline`,
            name: `timeline`,
          },
          {
            friendlyName: `Liked Tweets`,
            name: `likes`
          }
        ],
        backups: [
        ],
      },
      trello: {
        name: `trello`,
        bgColor: `#0065ff`,
        linked: false,
        scopes: [
          {
            friendlyName: `Your boards`,
            name: `my-boards`,
            info: `Boards not owned by your account won't be backed up`
          },
        ],
        backups: [
        ],
      },
      todoist: {
        name: `todoist`,
        bgColor: `#ee5244`,
        linked: false,
        scopes: [
          {
            friendlyName: `To-do tasks`,
            name: `tasks`,
          },
          {
            friendlyName: `Activity`,
            name: `activity`,
            info: `Requires Todoist Premium`
          },
          {
            friendlyName: `Backups`,
            name: `backups`,
            info: `Requires Todoist Premium, Todoist does daily backups and you can back them up here.`,
          },
        ],
        backups: [
        ],
      },
      notion: {
        name: `question`,
        comingSoon: true,
        bgColor: `#000`,
        linked: false,
        scopes: [
          {
            friendlyName: `All boards`,
            name: `all-boards`,
          },
        ],
        backups: [
        ],
      },
    }
  }

  if (!state.activeService) {
    state.activeService = state.services.twitter
  }

  return html(functions, state)
}

