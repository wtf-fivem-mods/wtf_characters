import React, { useState } from 'react'
import { connect } from 'redux-zero/react'
import styled from 'styled-components/macro'
import actions from '../actions'
import AnimButton from './AnimButton'

export default connect(
  () => ({}),
  actions
)(({ saveCharacter, match, history }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  function onSubmit(e) {
    e.preventDefault()
    saveCharacter(firstName, lastName)
  }
  function goBack() {
    history.goBack()
  }
  return (
    <StyledForm onSubmit={onSubmit}>
      <h1>Add Character</h1>
      <StyledInput
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder="First name"
        type="text"
        name="firstName"
        required
      />
      <StyledInput
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        placeholder="Last name"
        type="text"
        name="lastName"
        required
      />
      <Bottom>
        <AnimButton type="submit">
          <span>Add</span>
        </AnimButton>
        {match && match.path === '/add_character' ? (
          <AnimButton onClick={goBack}>
            <span>Back</span>
          </AnimButton>
        ) : null}
      </Bottom>
    </StyledForm>
  )
})

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  height: 100%;

  h1 {
    align-self: center;
  }
`

const StyledInput = styled.input`
  background-color: #eaeaea;

  width: 100%;
  padding: 30px;
  border: 0;
  margin: 0;
  outline: 0;

  font-size: 18px;
  color: #444;
  text-align: center;
  text-transform: uppercase;

  transition: all 0.5s;

  ::placeholder {
    color: #999;
  }

  &:focus {
    background-color: #fff;
  }

  &:after {
    transition: all 0.25s;
  }
`

const Bottom = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
