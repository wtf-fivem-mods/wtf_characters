import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'redux-zero/react'
import actions from '../actions'

export default connect(
  ({ characters }) => ({ characters }),
  actions
)(({ characters, selectCharacter }) => (
  <div>
    <h1>Select Character</h1>
    {characters.map(c => (
      <div key={c.id}>
        {c.id}: {c.firstName} {c.lastName}
        <br />
        <button onClick={selectCharacter.bind(this, c.id)}>Select</button>
      </div>
    ))}
    <br />
    <Link to="/add_character">Add Character</Link>
  </div>
))
