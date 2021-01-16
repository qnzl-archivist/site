const getFormData = require(`get-form-data`)

module.exports = (state, emit) => {
  const functions = {}

  functions.login = async (e) => {
    e.preventDefault()

    const data = getFormData(e.target)

    const didToken = await state.magic.auth.loginWithMagicLink({
      email: data.email,
    })

    const response = await state.request(`user`, {
      method: `POST`,
      headers: {
        [`Authorization`]: `Bearer ${didToken}`,
      },
    })

    if (response.ok) {
      const { user } = await response.json()

      state.user = user

      return emit(`pushState`, `/onboarding`)
    }

    return emit(`render`)
  }

  return functions
}

