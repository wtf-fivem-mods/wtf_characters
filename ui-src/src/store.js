import createStore from 'redux-zero'

const initialState = {
  shown: false,
  characters: [],
  steamID: null,
}

export default createStore(initialState)
