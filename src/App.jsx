import React, { useState, useEffect } from 'react'
import './App.css'
import { useRoutes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Thread from './components/Thread'

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
          element: <Home />
        },
        {
          path: 'thread', //+ /:id
          element: <Thread />
        }
      ]
    }
  ])
  return routes
}

export default App
