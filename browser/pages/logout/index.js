module.exports = (state, emit) => {
  state.request(`user`, {
      method: `DELETE`
    })
    .then((resp) => {
      return emit(`pushState`, `/`)
    })

  return state.loadingMessage
}
