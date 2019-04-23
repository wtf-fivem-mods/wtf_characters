import React from 'react'
import { connect } from 'redux-zero/react'
import actions from '../actions'

export default connect(
  () => {},
  actions
)(({ selectCharacter }) => (
  <div>
    <button onClick={selectCharacter}>Select</button>
  </div>
))
