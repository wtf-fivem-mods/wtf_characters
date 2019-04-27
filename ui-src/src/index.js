import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from './context'
import { IsDev } from './state'

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
)

if (IsDev && module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    ReactDOM.render(
      <Provider>
        <NextApp />
      </Provider>,
      document.getElementById('root')
    )
  })
}
