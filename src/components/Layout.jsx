import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import '../App.css'

function Layout() {

  const [search, setSearch] = useState("")

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <div className='top-nav-div'>
        <h1 className="poppins-bold">CdramaHub</h1>
        <div className="search-div">
          <input className="search-bar" type="text" value={search} onChange={handleChange} placeholder="Search CdramaHub"/>
        </div>
      </div>
      <div className="main-div">
          <div className="side-nav-div">
            <h1>Side nav</h1>
            <Link to="/" ><h3>Home</h3></Link>
          </div>
          <Outlet />
      </div>
    </>
  )
}

export default Layout
