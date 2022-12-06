
import React from 'react'
import { Link } from 'react-router-dom'

function Filter() {
  return (
    <div>
      <Link to="/">Все</Link>
      <Link to="/center">Центр</Link>
    </div>

  )
}

export default Filter