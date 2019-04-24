import history from './history'

const actions = store => ({
  showUI: (state, shown) => {
    if (shown === false) {
      history.push('/')
    }
    return { shown }
  },
  selectCharacter: (state, idx) =>
    fetch('http://wtf_characters/selectCharacter', {
      method: 'POST',
      body: JSON.stringify({ steamID: state.steamID, idx }),
    }).then(r => actions(store).showUI(state, false)),
  setSteamID: (state, steamID) => ({ steamID }),
  setCharacters: (state, characters) => ({ characters }),
  saveCharacter: (state, firstName, lastName) =>
    fetch('http://wtf_characters/saveCharacter', {
      method: 'POST',
      body: JSON.stringify({ steamID: state.steamID, firstName, lastName }),
    }).then(r => actions(store).showUI(state, false)),
})

export default actions
