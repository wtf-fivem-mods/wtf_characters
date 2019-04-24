import React, { useState } from 'react'
import { connect } from 'redux-zero/react'
import actions from '../actions'

export default connect(
  () => ({}),
  actions
)(({ saveCharacter }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  return (
    <div>
      <h1>Add Character</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          saveCharacter(firstName, lastName)
        }}
      >
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
      </form>
    </div>
  )
})
