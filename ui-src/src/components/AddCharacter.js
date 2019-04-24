import React, { useState } from 'react'
import { connect } from 'redux-zero/react'
import actions from '../actions'

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
    <div>
      <h1>Add Character</h1>
      <form onSubmit={onSubmit}>
        <input
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="First name"
          type="text"
          name="firstName"
          required
        />
        <br />
        <input
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Last name"
          type="text"
          name="lastName"
          required
        />
        <br />
        <button type="submit">Submit</button>
        {match && match.path === '/add_character' ? (
          <>
            <br />
            <button onClick={goBack}>Go Back</button>
          </>
        ) : null}
      </form>
    </div>
  )
})
