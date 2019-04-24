import React from 'react'
import { connect } from 'redux-zero/react'
import actions from '../actions'

export default connect(
  ({ steamID, newUser }) => ({ steamID, newUser }),
  actions
)(({ steamID, newUser, selectCharacter }) => (
  <div>
    <button onClick={selectCharacter}>Select</button> <br />
    <h1>Steam ID</h1>
    {steamID}
    <h1>New user?</h1>
    {newUser ? 'Yes' : 'No'}
  </div>
))
