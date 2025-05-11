import React, { useState, useEffect } from 'react'
import './App.css'
import { useRoutes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import PostPage from './components/PostPage'

/*

*/


function App() {

  const routes = useRoutes([
  {
    path: '/',
    element: <Layout />,
    children: [
    {
      path: '',
      element: <Home />,
    },
    {
      path: 'thread/:id', //+ /:id
      element: <PostPage />
    }
    ]
  }
  ])
  return routes
}

export default App
