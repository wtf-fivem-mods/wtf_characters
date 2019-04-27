import React, { useEffect } from 'react'
import { Route } from 'react-router'
import { HashRouter as Router } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components/macro'
import messageListener from '../messageListener'
import { useAppActions, useAppState } from '../context'
import { IsDev } from '../state'
import AddCharacter from './AddCharacter'
import Debug from './Debug'
import Home from './Home'

export default () => {
  const actions = useAppActions()
  useEventListener('message', messageListener(actions))
  const { steamID, shown, characters } = useAppState()

  const hasSteamID = steamID !== null
  const hasCharacters = characters.length > 0

  return (
    <Router>
      <GlobalStyle />
      {IsDev ? <Debug /> : null}
      <StyledApp shown={shown}>
        {hasSteamID ? (
          hasCharacters ? (
            <>
              <Route exact path="/" component={Home} />
              <Route path="/add_character" component={AddCharacter} />
            </>
          ) : (
            <AddCharacter />
          )
        ) : (
          <h1>No Steam ID</h1>
        )}
      </StyledApp>
    </Router>
  )
}

function useEventListener(type, listener) {
  useEffect(() => {
    window.addEventListener(type, listener)
    return () => {
      window.removeEventListener(type, listener)
    }
  })
}

const StyledApp = styled.div`
  box-sizing: border-box;

  width: 400px;
  height: 400px;
  display: ${props => (props.shown ? 'block' : 'none')};

  background-color: rgba(255, 255, 255, 0.8);

  padding: 0;
  margin: 0;
  clip-path: inset(0 0 0 0 round 40px);

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
