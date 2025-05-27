import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import "./SignIn.css"
import GoogleLogo from './assets/google-logo.webp'
import UserIconImg from './assets/user-white.png'

import { supabase } from './Client'

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({email: "", password: ""})
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

  const signIn = async() => {
    const { error } = await supabase.auth.signInWithPassword({
      email: userInfo.email, 
      password: userInfo.password
    })


    if (userInfo.email === "") {
      setErrorMessage("Email cannot be empty.")
      setErrorShowing(true)
    }
    else if (userInfo.password === "") {
      setErrorMessage("Password cannot be empty.")
      setErrorShowing(true)
    }
    else if (error == "AuthApiError: Invalid login credentials") {
      setErrorMessage("Incorrect email or password.")
      setErrorShowing(true)
    }
    else {
      //success
      window.location = "/"
    }
  }

  const googleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google"
    })
  }

  const anonymousSignIn = async () => {
    await supabase.auth.signInAnonymously()
    window.location = "/"
  }

  const disableErrorMessage = () => {
    setErrorShowing(false)
  }

  return (
    <div className="login-main-div">
      <div className="login-left-div">
        <div className="login-content-div">
          <h1 className="poppins-bold" id="header">Login to<h2 className="poppins-bold blue">AnimeHub</h2></h1>
          <div className="login-text-div">
            <input type="text" className="text-input" onClick={disableErrorMessage} value={userInfo.email} name="email" placeholder="Enter email" onChange={handleChange} />
            <input type="text" className="text-input" onClick={disableErrorMessage} value={userInfo.password} name="password" placeholder="Enter password" onChange={handleChange} />
            <input type="button" className="sign-in btn" onClick={signIn} value="Sign in" />
            <div className="row">
              <hr className="white divider"/>
              <div className="divider-text">
                <h4 className="white">or</h4>
              </div>
              <hr className="white divider"/>
            </div>
            <div className="row">
              <button className="short-btn blue-btn" onClick={anonymousSignIn}>
                <img className="login-img-small" src={UserIconImg}/>
                <h3 className="white">Guest</h3>
              </button>
              <button className="short-btn" onClick={googleSignIn}>
                <img className="login-img" src={GoogleLogo}/>
                <h3>Google</h3>
              </button>
            </div>
            <h4 className="white">Don't have an account? <Link to="/sign-up"><strong className="blue bold">Sign up</strong></Link></h4>
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