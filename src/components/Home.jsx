import React, { useState, useEffect } from 'react'
import './Home.css'
import Popup from 'reactjs-popup'
import Post from './Post'
import { Link, useOutletContext } from 'react-router-dom'
import Sparkles from '../assets/sparkles.png'

import { supabase } from '../Client.jsx'

function Home({ userSession }) {
  const [posts, setPosts] = useState([])

  const getData = async () => {
    const { data } = await supabase
    .from('ForumPosts')
    .select()
    .order("created_at", {ascending: false})
    setPosts(data)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSort = async (e) => {
    const { data } = await supabase
      .from('ForumPosts')
      .select()
      .order([e.target.name], {ascending: false})
      setPosts(data)
  }

  const handleSortOld = async (e) => {
    const { data } = await supabase
      .from('ForumPosts')
      .select()
      .order([e.target.name], {ascending: true})
      setPosts(data)
  }

  const search = useOutletContext()
  useEffect(() => {
    const filterBySearch = async () => {
      const { data } = await supabase
        .from('ForumPosts')
        .select()
        .ilike("title", `%${search}%`)
        setPosts(data)
    }

    if(search === "") {
      getData()
    }
    else {
      filterBySearch()
      console.log(search)
    }
  }, [search])

  console.log(userSession)
  
  return (
  <div className="main-div">
    <div className="content-div">

      <Popup trigger= {<div className="sort-options"><p>Sort by ↓</p></div>} arrow={false}>
        <div className="options-div">
          <input type="button" onClick={handleSort} name="created_at" className="options-btn" value="New" />
          <input type="button" onClick={handleSort} name="likes" className="options-btn" value="Hot" />
          <input type="button" onClick={handleSortOld} name="created_at" className="options-btn" value="Old" />
        </div>
      </Popup>

      <div className="posts-div">
        {posts && posts.map(post => (
          <Link to={"/thread/" + post.id} key={post.id}><Post info={post}/></Link>
        ))}
      </div>
      
    </div>
    <div className="right-rec-div">
      <div className="recommendations-div signed-in">
        {
          userSession ?
          (
            (Object.keys(userSession.user.user_metadata).length > 0)
            ?
            (
              <div className="rec-content-div">
                <h2 className="white">Welcome to AnimeHub, </h2>
                <h2 className="poppins-bold white">{userSession.user.user_metadata.name}</h2>
                <img className="welcome-img" src={Sparkles} />
              </div>
            )
            :
            (
              <div className="rec-content-div">
                <h2 className="white">Welcome to AnimeHub,</h2>
                <h2 className="poppins-bold white">Guest</h2>
                <img className="welcome-img" src={Sparkles} />
              </div>
            )
          )
          :
          (
            <div className="rec-content-div">
              <h2 className="white">Please sign in to see this message</h2>
            </div>
          )
        }
      </div>
    </div>
  </div>
  )
}

export default Home
