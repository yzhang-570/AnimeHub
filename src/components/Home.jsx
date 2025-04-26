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

  const handleSort = async (e) => {
    const { data } = await supabase
      .from('ForumPosts')
      .select()
      .order([e.target.name], {ascending: false})
      setPosts(data)
  }

  return (
  <div className="main-div">
    <div className="content-div">
    <Popup trigger={<div className="createpost-div">
        <h3>+Create</h3>
      </div>} modal>
      {close => ( //create custom close behavior
        <CreateForm onClose={() => close()}/>
      )}
    </Popup>

    <Popup trigger= {<div className="sort-options"><p>Sort by ↓</p></div>} arrow={false}>
      <div className="options-div">
        <input type="button" onClick={handleSort} name="likes" className="options-btn" value="Hot" />
        <input type="button" onClick={handleSort} name="created_at" className="options-btn" value="New" />
      </div>
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
