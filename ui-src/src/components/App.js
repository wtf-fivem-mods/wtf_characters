import React from 'react'
import { Route } from 'react-router'
import { connect } from 'redux-zero/react'
import styled, { createGlobalStyle } from 'styled-components/macro'
import actions from '../actions'
import AddCharacter from './AddCharacter'
import Home from './Home'

export default connect(
  ({ steamID, shown, characters }) => ({
    shown,
    hasSteamID: steamID !== null,
    hasCharacters: characters.length > 0,
  }),
  actions
)(({ hasSteamID, shown, hasCharacters, showUI }) => {
  function renderRoot() {
    return hasCharacters ? <Home /> : <AddCharacter />
  }
  function dismiss() {
    showUI(false)
  }
  return (
    <>
      <GlobalStyle />
      <App shown={shown}>
        {hasSteamID ? (
          <>
            <Route exact path="/" render={renderRoot} />
            <Route path="/add_character" component={AddCharacter} />
          </>
        ) : (
          <>
            <h1>No Steam ID</h1>
            <button onClick={dismiss}>Dismiss</button>
          </>
        )}
      </App>
    </>
  )
})

const App = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.8);
  display: ${props => (props.shown ? 'block' : 'none')};

  box-sizing: border-box;
  padding: 0;
  margin: 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    font: 14px/1.21 'Helvetica Neue', arial, sans-serif;
    font-weight: 400;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
  }
`
