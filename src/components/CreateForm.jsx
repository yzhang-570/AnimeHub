import React, { useState, useEffect } from 'react'
import './CreateForm.css'
import { supabase } from '../Client.jsx'
import userImg from '../assets/user-avatar.jpg'
import { Popup } from 'reactjs-popup'

import AnimeInfoButton from './AnimeInfoButton'

function CreateForm({ onClose, userSession }) {

  const [newPost, setNewPost] = useState({ title: "", desc: "", image_url: "", display_name: "", profile_img: "", anime_id: ""})
  const[animeTopicDisplay, setAnimeTopicDisplay] = useState({})
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
    }
  }
  
  const toggleSearchTab = () => {
    setSearchTabOpen(!searchTabOpen)
  }

  const setPostTopic = ({ id, title, image }) => {
    setSearchTabOpen(false)
    setNewPost((prev) => ({...prev, anime_id: id}))
    setAnimeTopicDisplay((prev) =>
      ({...prev, anime_title: title, 
       anime_image: image}))
    setSearchText("")
  }

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const getAnimeResults = async () => {
      if(searchText.trim() !== "") {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchText}&sfw=true&limit=10`)
        // const response = await fetch(`https://api.jikan.moe/v4/anime/59571`)
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

  return (
    <div className="popup-bg">
        <div className="popup-div">

            <div className="popup-header">
              <input type="button" value="X" onClick={onClose} className="close-btn"/>
              <h2>Create Post</h2>
            </div>

            {/* Search prompt button */}
            {Object.keys(animeTopicDisplay).length === 0
              ?
              (<button className="set-topic-btn" onClick={toggleSearchTab}><h3>+ Add Topic</h3></button>)
              :
              (<button className="set-topic-btn topic-display" onClick={toggleSearchTab}>
                <img src={animeTopicDisplay.anime_image} />
                <div className="column">
                  <h3>Topic selected:</h3>
                  {
                    animeTopicDisplay.anime_title === null ?
                    (<h2>Unknown Title</h2>)
                    :
                    (<h2>{animeTopicDisplay.anime_title}</h2>)
                  }
                </div>
               </button>)
            }

            {/* Search Window */}
            {searchTabOpen && <div className="topic-search-div">
              <input type="text" className="text-field search" name="search" value={searchText} onChange={handleSearchText} placeholder="Search for an anime"></input>
              <div className="search-results">
              {animeSearchData.length !== 0 ?
                (animeSearchData.map((animeInfo) => (
                  <div key={crypto.randomUUID()}>
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
