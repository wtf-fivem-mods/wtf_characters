import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'redux-zero/react'
import { bindActions } from 'redux-zero/utils'
import actions from './actions'
import App from './components/App'
import Debug from './components/Debug'
import store from './store'
import { HashRouter as Router } from 'react-router-dom'

const boundActions = bindActions(actions, store)
window.addEventListener('message', e => {
  switch (e.data.type) {
    case 'open':
      boundActions.showUI(true)
      break
    case 'steamID':
      boundActions.setSteamID(e.data.steamID)
      break
    case 'characters':
      boundActions.setCharacters(e.data.characters)
      break
    default:
  }
})

const isDebug = typeof window.invokeNative === 'undefined'
if (isDebug) {
  boundActions.showUI(true)
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {isDebug ? <Debug /> : null}
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          {isDebug ? <Debug /> : null}
          <NextApp />
        </Router>
      </Provider>,
      document.getElementById('root')
    )
  })
}
