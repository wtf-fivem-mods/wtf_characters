import React from 'react'
import { Route, withRouter } from 'react-router'
import { connect } from 'redux-zero/react'
import styled, { createGlobalStyle } from 'styled-components/macro'
import actions from '../actions'
import Home from './Home'
import AddCharacter from './AddCharacter'

export default withRouter(
  connect(
    ({ characters, shown }) => ({ characters, shown }),
    actions
  )(({ characters, shown }) => (
    <>
      <GlobalStyle />
      <App shown={shown}>
        <Route
          exact
          path="/"
          render={() => (characters.length > 0 ? <Home /> : <AddCharacter />)}
        />
        <Route path="/add_character" component={AddCharacter} />
      </App>
    </>
  ))
)

const App = styled.div`
  width: 500px;
  height: 720px;
  background-color: white;
  display: ${props => (props.shown ? 'block' : 'none')};
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
