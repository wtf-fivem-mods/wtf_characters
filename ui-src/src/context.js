import produce from 'immer'
import React, { createContext, useContext, useMemo, useReducer } from 'react'
import { actions, initialState } from './state'

const AppActions = createContext()
const AppState = createContext()
export const useAppActions = () => useContext(AppActions)
export const useAppState = () => useContext(AppState)

const reducer = (state, action) => produce(state, draft => action(draft))

const bindActions = (actions, dispatch) => {
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
  const [state, dispatch] = useReducer(reducer, initialState)
  const boundActions = useMemo(() => bindActions(actions, dispatch), [dispatch])
  return (
    <AppActions.Provider value={boundActions}>
      <AppState.Provider value={state}>{children}</AppState.Provider>
    </AppActions.Provider>
  )
}
