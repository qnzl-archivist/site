module.exports = (app) => {
  app.use((state, emitter) => {
    state.request = async (url, params) => {
      let component = state.route.split(`/`)[0]

      component = component.includes(`-`) ? component.replace(/\-/g, ``) : component

      const {
        messages = {}, headers = {}, body, method = `GET`
      } = params || {}
      const { success, fail = `Failed ${method}-ing ${url}` } = messages

      if (url.startsWith(`/`)) {
        throw new Error(`url cant start with /`)
      }

      try {
        // TODO Don't require writing /api
        const res = await fetch(`/api/${url}`, {
          method,
          body: JSON.stringify(body) || undefined,
          headers: Object.assign({
            Accept: `application/json`,
            'Content-Type': `application/json`
          }, headers)
        })

        const statusCode = Number(res.status)

        if (statusCode > 199 && statusCode < 300) {
          emitter.emit(`message`, `success`, success, component)
        } else {
          emitter.emit(`message`, `error`, fail, component)
        }

        return res
      } catch (e) {
        emitter.emit(`message`, `error`, fail, component)

        throw e
      }
    }
  })
}
