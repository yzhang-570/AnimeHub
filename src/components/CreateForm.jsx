import React, { useState, useEffect } from 'react'
import './CreateForm.css'
import { supabase } from '../Client.jsx'
import userImg from '../assets/user-avatar.jpg'
import { Popup } from 'reactjs-popup'

import AnimeInfoButton from './AnimeInfoButton'

function CreateForm({ onClose, userSession }) {

  const [newPost, setNewPost] = useState({ title: "", desc: "", image_url: "", display_name: "", profile_img: "", topic_id: ""})
  const [searchTabOpen, setSearchTabOpen] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [animeSearchData, setAnimeSearchData] = useState([])
 
  const createPost = async (e) => {
    e.preventDefault()

    await supabase
      .from('ForumPosts')
      .insert(newPost)
    onClose()

    window.location = "/"
    location.reload()
  }

  const handleChange = (e) =>  {
    // set post details
    setNewPost((prev) => (
        {...prev, [e.target.name]: e.target.value})
    )
    setNewPost((prev) => (
        {...prev, user_id: userSession.user.id})
      )

    // set user info
    if(Object.keys(userSession.user.user_metadata).length > 0) {
      setNewPost((prev) => (
        {...prev, display_name: userSession.user.user_metadata.name})
      )
      setNewPost((prev) => (
        {...prev, profile_img: userSession.user.user_metadata.avatar_url})
      )
    }
    else {
      setNewPost((prev) => (
        {...prev, display_name: "Guest"})
      )
      setNewPost((prev) => (
        {...prev, profile_img: userImg})
      )
      console.log(userSession.user)
    }
  }
  
  const setPostTopic = (e) => {
    console.log(e)
    setSearchTabOpen(false)
    setNewPost((prev) => ({...prev, topic_id: e.target.value}))
    setSearchText("")
  }

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const getAnimeResults = async () => {
      if(searchText.trim() !== "") {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchText}&sfw=true&limit=4`)
        const data = await response.json()
        setAnimeSearchData(data.data)
      }
      else {
        setAnimeSearchData([])
      }
    }

    var delayAPICall = setTimeout(getAnimeResults, 1000)

    return () => clearTimeout(delayAPICall)
  }, [searchText])

  // console.log(animeSearchData)
  /*
    1. (done) get search working first
    2. (done) fix rate limiting problem
    3. (done) display results
    4. save selected anime -> how to store/get id
    5. display topic on post
  */

  return (
    <div className="popup-bg">
        <div className="popup-div">

            <div className="popup-header">
              <input type="button" value="X" onClick={onClose} className="close-btn"/>
              <h2>Create Post</h2>
            </div>

            {/* Search prompt button */}
            {newPost.topic_id === ""
              ?
              (<button className="set-topic-btn" onClick={() => setSearchTabOpen(true)}><h3>+ Add Topic</h3></button>)
              :
              (<button className="set-topic-btn" onClick={() => setSearchTabOpen(true)}><h3>{newPost.topic_id}</h3></button>)
            }

            {/* Search Window */}
            {searchTabOpen && <div className="topic-search-div">
              <input type="text" className="text-field search" name="search" value={searchText} onChange={handleSearchText} placeholder="Search for an anime"></input>
              <div className="search-results">
              {animeSearchData.length !== 0 ?
                (animeSearchData.map((animeInfo) => (
                  <div key={animeInfo.url} onClick={setPostTopic}>
                      <AnimeInfoButton animeInfo={animeInfo} setPostTopic={setPostTopic}/>
                  </div>
                )))
                :
                (
                  <div id="no-results-div">
                    <h3 id="no-results-msg">No anime found</h3>  
                  </div>
                )
              }
              </div>
            </div>}

            <input type="text" className="text-field" name="title" onChange={handleChange} placeholder="Title"></input>
            <textarea rows="10" className="text-field" name="desc" onChange={handleChange} placeholder="Description (optional)"></textarea>
            <input type="text" className="text-field" name="image_url" onChange={handleChange} placeholder="enter image url here"></input>
            <input type="button" className="post-btn" value="Post" onClick={createPost}/>

        </div>
    </div>
  )
}

export default CreateForm
