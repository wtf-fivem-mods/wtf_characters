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
  const { shown, steamID, characters } = useAppState()

  return (
    <Container shown={shown}>
      {steamID === null ? (
        <h1>No Steam ID</h1>
      ) : characters.length === 0 ? (
        <AddCharacter />
      ) : (
        <>
          <Route exact path="/" component={Home} />
          <Route path="/add_character" component={AddCharacter} />
        </>
      )}
    </Container>
  )
}

function Container({ children, shown }) {
  const actions = useAppActions()
  useEventListener('message', messageListener(actions))
  return (
    <>
      <GlobalStyle />
      <Router>
        {IsDev ? <Debug /> : null}
        {shown ? <Content>{children}</Content> : null}
      </Router>
    </>
  )
}

function useEventListener(type, listener) {
  useEffect(() => {
    window.addEventListener(type, listener)
    return () => {
      window.removeEventListener(type, listener)
    }
  }, [])
}

const Content = styled.div`
  box-sizing: border-box;

  width: 400px;
  height: 400px;

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
