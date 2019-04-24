import createStore from 'redux-zero'

const initialState = {
  shown: false,
  newUser: false,
  steamID: null,
}

export default createStore(initialState)
