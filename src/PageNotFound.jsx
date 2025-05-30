import React from 'react'
import './PageNotFound.css'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className="not-found-div">
      <h1>This page does not exist</h1>
      <br></br>
      <Link to="/"><div className="button-div">Return home</div></Link>
    </div>
  )
}

export default PageNotFound
