import React, { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import './Navigation.css'

import Popup from 'reactjs-popup'
import CreateForm from './CreateForm'
import userImage from '../assets/user-avatar.jpg'
import HomeImg from '../assets/home.png'
import UserIconImg from '../assets/user.png'

import supabase from '../Client'

function Navigation({ userSession, checkForUserSession }) {

  const [search, setSearch] = useState("")

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location = "/"
  }

  useEffect(() => {
    checkForUserSession()
  }, [])

  return (
    <>
      <div className='top-nav-div'>
        <Link to="/">
          <h1 className="poppins-bold blue">AnimeHub</h1>
        </Link>
        <div className="btns-div">
          <div className="search-div">
            <input className="search-bar" type="text" value={search} onChange={handleChange} placeholder="Search CdramaHub"/>
          </div>
          {
            userSession ?
            (
              <>
                <Popup trigger={<div className="createpost-div">
                  <h3 className="poppins-medium">+Create</h3>
                </div>} modal>
                {close => ( //create custom close behavior
                  <CreateForm onClose={() => close()} userSession={userSession}/>
                )}
                </Popup>
                <Popup trigger= {
                  (Object.keys(userSession.user.user_metadata).length > 0)
                  ?
                  (<img className="user-img" src={userSession.user.user_metadata.avatar_url} />)
                  :
                  (<img className="user-img" src={userImage} />)
                  } arrow={false}>
                  <div className="home-options-div">
                    <input type="button" className="options-btn" value="Profile" />
                    <input type="button" onClick={handleSignOut} className="options-btn" value="Sign Out" />
                  </div>
                </Popup>
              </>
            )
            :
            (
                <Link to="sign-in">
                  <div className="createpost-div">
                    <h3 className="poppins-medium">Sign In</h3>
                  </div>
                </Link>
            )
          }
        </div>
      </div>
      <div className="main-div">
          <div className="side-nav-div">
            <div className="side-nav-btns-div">
              <Link to="/" >
                <div className="side-nav-link">
                  <img src={HomeImg}/>
                  <h3>Home</h3>
                </div>
              </Link>
              {userSession ? 
                (<Link to="/" >
                  <div className="side-nav-link">
                    <img src={UserIconImg}/>
                    <h3>My Profile</h3>
                  </div>
                </Link>)
                :
                (<Link to="/sign-in" >
                  <div className="side-nav-link">
                    <img src={UserIconImg}/>
                    <h3>My Profile</h3>
                  </div>
                </Link>)
              }
            </div>
            <div className="side-nav-btns-div">
              <Link to="/" >
                <div className="side-nav-link">
                  <img/>
                  <h3>A Thread</h3>
                </div>
              </Link>
            </div>
          </div>
          <Outlet context={search}/>
      </div>
    </>
  )
}

export default Navigation