import React from 'react'
import { connect } from 'redux-zero/react'
import actions from '../actions'

export default connect(
  ({ steamID, characters }) => ({ steamID, characters }),
  actions
)(({ steamID, characters, selectCharacter }) => (
  <div>
    <h1>Select Character</h1>
    {characters.map(c => (
      <div key={c.id}>
        {c.id}: {c.firstName} {c.lastName}
        <br />
        <button onClick={() => selectCharacter(c.id)}>Select</button>
      </div>
    ))}
    <br />
    Steam ID: {steamID}
  </div>
))
