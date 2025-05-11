import React, { useState, useEffect } from 'react'
import './components/Navigation.css'

import supabase from './Client'

import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import PostPage from './components/PostPage'
import SignIn from './components/SignIn'

function App() {

  const [userSession, setUserSession] = useState(null)

  const checkForUserSession = () => {
    // check for sign in status on rerender/refresh
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUserSession(session)
    })

    return () => subscription.unsubscribe()
  }

  const routes = useRoutes([
  {
    path: '/',
    element: <Navigation userSession={userSession} checkForUserSession={checkForUserSession}/>,
    children: [
    {
      path: '',
      element: <Home userSession={userSession}/>,
    },
    {
      path: 'thread/:id', //+ /:id
      element: <PostPage userSession={userSession}/>
    },
    {
      path: 'sign-in',
      element: <SignIn/>
    }
    ]
  }
  ])

  return routes

}

export default App
