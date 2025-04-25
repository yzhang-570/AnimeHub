import React from 'react'
import { Outlet } from 'react-router-dom'
import '../App.css'

function Layout() {
  return (
    <>
      <div className='top-nav-div'>
        <h1>Top nav</h1>
      </div>
      <div className="main-div">
          <div className="side-nav-div">
            <h1>Side nav</h1>
          </div>
          <Outlet />
      </div>
    </>
  )
}

export default Layout
