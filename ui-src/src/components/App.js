import React from 'react'
import { Route } from 'react-router'
import { connect } from 'redux-zero/react'
import styled, { createGlobalStyle } from 'styled-components/macro'
import actions from '../actions'
import Home from './Home'

export default connect(
  ({ shown }) => ({ shown }),
  actions
)(({ shown }) => (
  <>
    <GlobalStyle />
    <App shown={shown}>
      <Route exact path="/" component={Home} />
    </App>
  </>
))

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
