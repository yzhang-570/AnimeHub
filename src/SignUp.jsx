import { useState, useEffect } from 'react'
import supabase from './Client'
import { Link } from 'react-router-dom'

import "./SignIn.css"

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({email: "", password: ""})

  /*
  create account with email
  */
  const handleChange = (e) => {
    setUserInfo((prev) => (
      {...prev, [e.target.name]: e.target.value}
    ))
  }

  const signUp = async () => {
    await supabase.auth.signUp({
      email: userInfo.email, 
      password: userInfo.password
    })

    setUserInfo({email: "", password: ""})
    window.location = "/"
  }

  return (
    <div className="login-main-div">
      <div className="login-left-div">
        <div className="login-content-div">
          <h1 className="poppins-bold" id="header">Sign up<h2 className="poppins-bold blue">AnimeHub</h2></h1>
          <div className="login-text-div">
            <input type="text" className="text-input" value={userInfo.email} name="email" placeholder="Enter email" onChange={handleChange} />
            <input type="text" className="text-input" value={userInfo.password} name="password" placeholder="Enter password" onChange={handleChange} />
            <input type="button" className="sign-in btn" onClick={signUp} value="Sign up" />
            <h4 className="white">Already have an account? <Link to="/sign-in"><strong className="blue bold">Sign in</strong></Link></h4>
          </div>
        </div>
      </div>
      <div className="login-right-div">
      </div>
    </div>
  )
}