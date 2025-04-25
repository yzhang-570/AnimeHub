import React, { useState, useEffect } from 'react'
import './Home.css'
import Popup from 'reactjs-popup'
import CreateForm from './CreateForm'
import Post from './Post'
import { Link } from 'react-router-dom'

import supabase from '../Client.jsx'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase
        .from('ForumPosts')
        .select()
      setPosts(data)
    }
    getData()
  }, [])

  // console.log(posts)

  return (
    <div className="main-div">
      <div className="content-div">
        <Popup trigger={<div className="createpost-div">
                <h2>What's happening?</h2>
                <button>+</button>
            </div>} modal>
            {close => ( //create custom close behavior
                <CreateForm onClose={() => close()}/>
            )}
        </Popup>
        {/* <h3>main content</h3> */}
        {posts && posts.map(post => (
          <Link to={"/thread/" + post.id} key={post.id}><Post info={post}/></Link>
        ))}
      </div>
      <div className="right-rec-div">
        <h1>some recs</h1>
      </div>
    </div>
  )
}

export default Home
