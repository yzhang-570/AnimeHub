import { useState, useEffect } from 'react'
import supabase from '../Client'

export default function SignIn() {
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

  const signIn = async() => {
    await supabase.auth.signInWithPassword({
      email: userInfo.email, 
      password: userInfo.password
    })
    window.location = "/"
  }

  const googleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google"
    })
  }

  const anonymousSignIn = async () => {
    await supabase.auth.signInAnonymously()
    setUserInfo((prev) => (
      {...prev, email: "Guest"}
    ))
    window.location = "/"
  }


  return (
    <div>
      <h1>Please sign in</h1>
      <input type="text" value={userInfo.email} name="email" placeholder="Enter email" onChange={handleChange} />
      <input type="text" value={userInfo.password} name="password" placeholder="Enter password" onChange={handleChange} />
      <input type="button" onClick={signUp} value="Sign Up" />
      <input type="button" onClick={signIn} value="Sign in" />
      <input type="button" onClick={googleSignIn} value="Continue with Google"/>
      <input type="button" onClick={anonymousSignIn} value="Continue as Guest" />
    </div>
  )
}