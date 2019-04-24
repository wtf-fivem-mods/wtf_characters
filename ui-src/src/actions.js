import history from './history'

const actions = store => ({
  showUI: (state, shown) => {
    if (shown === false) {
      history.push('/')
    }
    return { shown }
  },
  selectCharacter: state => {
    fetch('http://wtf_characters/selectCharacter', { method: 'POST' }) // ignore whether it returns or not
    return actions(store).showUI(state, false)
  },
  setNewUser: (state, newUser) => ({ newUser }),
  setSteamID: (state, steamID) => ({ steamID }),
})

export default actions
