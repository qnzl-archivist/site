const store = require(`store2`)
const dayjs = require(`dayjs`)

module.exports = (state, emit) => {
  const functions = {}

  functions.openService = (name) => {
    return (e) => {
      state.activeService = state.services[name]
      state.sidebarOpen = false

      return emit(`render`)
    }
  }

  functions.requestBackup = async (e) => {
    const activeService = state.activeService

    const resp = await fetch(`/api/service/${activeService.name}/backup`, {
      method: `POST`,
    })

    if (resp.ok) {
      activeService.backupInProgress = true

      return emit(`render`)
    }
  }

  functions.toggleSidebar = (e) => {
    state.sidebarOpen = !state.sidebarOpen

    return emit(`render`)
  }

  functions.changeServiceScope = async (e) => {
    const {
      target: {
        name,
      }
    } = e

    const scope = state.activeService.scopes.find((scope) => {
      return scope.name === name
    })

    scope.checked = !scope.checked

    const res = await fetch(`/api/service/${state.activeService.name}/scopes`, {
      method: `PUT`,
      headers: {
        [`Content-Type`]: `application/json`,
      },
      body: JSON.stringify({
        scopes: state.activeService.scopes.filter(({checked}) => checked).map(({ name }) => name),
      })
    })

    state.activeService.message = res.ok ? `Saved!` : `Failed to save`

    emit(`render`)

    setTimeout(() => {
      state.activeService.message = ``;

      return emit(`render`)
    }, 3000)
  }

  functions.downloadArchive = (id) => {
    return async (e) => {
      e.stopPropagation()

      const { name, backups } = state.activeService
      const backup = backups.find(({ _id }) => id === _id)

      const fileRes = await fetch(`/api/service/download-backup/${id}`)

      const file = await fileRes.blob()

      const fileUrl = window.URL.createObjectURL(file)
      let element = document.createElement(`a`)
      element.href = fileUrl
      element.download = `${name}-${dayjs(backup.date).format()}-archive.json`
      element.click()
    }
  }

  functions.linkService = async (e) => {
    e.stopPropagation()

    if (state.activeService.linked) {
      const res = await fetch(`/api/service/${state.activeService.name}`, {
        method: `DELETE`,
      });

      state.activeService.linked = false
      state.activeService.backupInProgress = false

      return emit(`render`)
    } else {
      $('#link-button-text').text(``).addClass('dot-flashing')

      const res = await fetch(`/api/service/${state.activeService.name}`, {
        mode: `no-cors`,
        redirect: `manual`
      });

      window.location = res.url
    }
  }

  return functions
}
