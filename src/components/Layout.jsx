import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import '../App.css'

import Popup from 'reactjs-popup'
import CreateForm from './CreateForm'

function Layout() {

  const [search, setSearch] = useState("")

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <div className='top-nav-div'>
        <Link to="/">
          <h1 className="poppins-bold blue">Kelly's CdramaHub</h1>
        </Link>
        <div className="btns-div">
          <Popup trigger={<div className="createpost-div">
              <h3 className="poppins-medium">+Create</h3>
            </div>} modal>
            {close => ( //create custom close behavior
              <CreateForm onClose={() => close()}/>
            )}
          </Popup>
          <div className="search-div">
            <input className="search-bar" type="text" value={search} onChange={handleChange} placeholder="Search CdramaHub"/>
          </div>
        </div>
      </div>
      <div className="main-div">
          <div className="side-nav-div">
            {/* <h1>Side nav</h1> */}
            <Link to="/" ><h3>Home</h3></Link>
          </div>
          <Outlet context={search}/>
      </div>
    </>
  )
}

export default Layout
