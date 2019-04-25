import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'redux-zero/react'
import actions from '../actions'
import styled from 'styled-components/macro'

export default connect(
  ({ characters }) => ({ characters }),
  actions
)(({ characters, selectCharacter }) => (
  <Container>
    <h1>Select Character</h1>
    {characters.map(c => (
      <Character key={c.idx} {...c} onSelect={selectCharacter} />
    ))}
    <Bottom>
      <Link to="/add_character">
        <AddNewButton>
          <span>Add Character</span>
        </AddNewButton>
      </Link>
    </Bottom>
  </Container>
))

const Character = ({ idx, firstName, lastName, onSelect }) => (
  <AnimButton onClick={onSelect.bind(this, idx)}>
    <span>
      {firstName} {lastName}
    </span>
  </AnimButton>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;

  h1 {
    align-self: center;
  }
`

const Bottom = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const AnimButton = styled.section`
  background-color: #eaeaea;

  width: 100%;
  position: relative;
  display: inline-block;
  // float: left;
  padding: 40px;
  transition: all 0.5s;

  cursor: pointer;
  user-select: none;

  &:after {
    position: absolute;
    z-index: 9;
    content: '';
    transition: all 0.25s;
  }

  &:hover:after {
    width: 100%;
    height: 100%;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 99;
    font-size: 18px;
    color: #444;
    text-align: center;
    text-transform: uppercase;
    transform: translate(-50%, -50%);
  }

  &:after {
    left: 0;
    background-color: #fff;
  }

  &:after {
    top: 0;
    width: 0;
    height: 100%;
  }
`

const AddNewButton = styled(AnimButton)`
  margin-bottom: 40px;
`
