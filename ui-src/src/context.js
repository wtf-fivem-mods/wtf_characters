import produce from 'immer'
import React from 'react'
import { actions, initialState } from './state'

const AppActions = React.createContext()
const AppState = React.createContext()
export const useAppActions = () => React.useContext(AppActions)
export const useAppState = () => React.useContext(AppState)

const reducer = (state, action) => produce(state, draft => action(draft))

const bindActions = (actions, dispatch) => {
  if (foo !== null) return foo
  let bound = {}
  for (let name in actions) {
    bound[name] = (...args) => {
      const action = actions[name]
      dispatch(draft => action(draft, ...args))
    }
  }
  return bound
}

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const boundActions = bindActions(actions, dispatch)
  return (
    <AppActions.Provider value={boundActions}>
      <AppState.Provider value={state}>{children}</AppState.Provider>
    </AppActions.Provider>
  )
}
