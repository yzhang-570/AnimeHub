import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import "./SignIn.css"
import guestImg from './assets/user-avatar.jpg'

import { supabase } from './Client'

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({email: "", name: "", password: ""})
  const [errorShowing, setErrorShowing] = useState(false)
  const [errorMessage, setErrorMessage] = useState("error message")

  /*
  create account with email
  */
  const handleChange = (e) => {
    setUserInfo((prev) => (
      {...prev, [e.target.name]: e.target.value}
    ))
  }

  const signUp = async () => {
    const {userSession, error} = await supabase.auth.signUp({
      email: userInfo.email, 
      password: userInfo.password,
      options: {
        data: {
          name: userInfo.name,
          avatar_url: guestImg
        }
      }
    })
    console.log(userSession)
    console.log(error)
    //email empty
    if(userInfo.email === "") {
      setErrorMessage("Email cannot be empty.")
      console.log("error: empty email")
      setErrorShowing(true)
    }
    //email already in use
    else if(error == "AuthApiError: User already registered") {
      setErrorMessage("Email is already in use.")
      setErrorShowing(true)
    }
    //invalid email
    else if(error == "AuthApiError: Unable to validate email address: invalid format") {
      setErrorMessage("Invalid email.")
      setErrorShowing(true)
    }
    //username empty
    else if(userInfo.name === "") {
      setErrorMessage("Username cannot be empty.")
      setErrorShowing(true)
    }
    //password empty
    else if(error == "AuthApiError: Signup requires a valid password") {
      setErrorMessage("Password cannot be empty.")
      setErrorShowing(true)
    }
    //password too short
    else if(error == "AuthWeakPasswordError: Password should be at least 6 characters.") {
      setErrorMessage("Password must be at least 6 characters.")
      setErrorShowing(true)
    }
    //success
    else {
      setUserInfo({email: "", name: "", password: ""})
      disableErrorMessage()
      window.location = "/"
    }
  }

  const disableErrorMessage = () => {
    setErrorShowing(false)
  }

  return (
    <div className="login-main-div">
      <div className="login-left-div">
        <div className="login-content-div">
          <h1 className="poppins-bold" id="header">Sign up<h2 className="poppins-bold blue">AnimeHub</h2></h1>
          <div className="login-text-div">
            <input type="email" className="text-input" onClick={disableErrorMessage} value={userInfo.email} name="email" placeholder="Enter email" onChange={handleChange} required/>
            <input type="text" className="text-input" onClick={disableErrorMessage} value={userInfo.name} name="name" placeholder="Enter username" onChange={handleChange} />
            <input type="text" className="text-input" onClick={disableErrorMessage} value={userInfo.password} name="password" placeholder="Enter password" onChange={handleChange} />
            <input type="button" className="sign-in btn" onClick={signUp} value="Sign up" />
            <h4 className="white">Already have an account? <Link to="/sign-in"><strong className="blue bold">Sign in</strong></Link></h4>
            <div className="error-div">
              {errorShowing && <h4 className="red">{errorMessage}</h4>}
            </div>
          </div>
        </div>
      </div>
      <div className="login-right-div">
      </div>
    </div>
  )
}