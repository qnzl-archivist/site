module.exports = (state, emit) => {
  const functions = {}

  functions.toggleLandingMenu = () => {
    state.showLandingMenu = !state.showLandingMenu

    return emit(`render`)
  }

  return functions
}
