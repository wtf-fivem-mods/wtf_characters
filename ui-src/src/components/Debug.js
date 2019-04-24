import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'redux-zero/react'
import styled, { createGlobalStyle } from 'styled-components/macro'
import actions from '../actions'
import gtaBg from './images/gtabg.png'

const fakeCharacter = { id: 0, firstName: 'Tom', lastName: 'Foolery' }
const fakeCharacter2 = { id: 1, firstName: 'Bradley', lastName: 'Booper' }

export default connect(
  ({ shown }) => ({ shown }),
  actions
)(({ shown, showUI, setCharacters, setSteamID }) => (
  <Header>
    <GTABackgroundStyle />
    <nav>
      <span>DEBUG MENU</span>
      <Link to="/">Home</Link>
      <Link to="/add_character">Add Character</Link>
      <button onClick={() => setSteamID('abc123')}>Set SteamID</button>
      <button onClick={() => setCharacters([fakeCharacter])}>
        1 Character
      </button>
      <button onClick={() => setCharacters([fakeCharacter, fakeCharacter2])}>
        2 Characters
      </button>
      {shown ? (
        <button onClick={() => showUI(false)}>Hide</button>
      ) : (
        <button onClick={() => showUI(true)}>Show</button>
      )}
    </nav>
  </Header>
))

const Header = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 56px;
  background: #6d3333;
  line-height: 56px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

  nav {
    display: inline-block;
    padding: 0 10px;
  }
  nav a,
  button {
    background: none;
    border: none;
    color: #fff;
    display: inline-block;
    font-size: 18px;
    font-weight: 300;
    height: 100%;
    letter-spacing: 0.05em;
    outline: 0;
    padding: 0 10px;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`

const GTABackgroundStyle = createGlobalStyle`
  body {
    background: url(${gtaBg});
    background-size: cover;
  }
`
