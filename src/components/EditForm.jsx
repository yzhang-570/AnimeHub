import React, { useState, useEffect } from 'react'
import './CreateForm.css'

import { supabase } from '../Client'
import AnimeInfoButton from './AnimeInfoButton'

function EditForm({ onClose, info }) {

  const [post, setPost] = useState(info[0])
  const[animeTopicDisplay, setAnimeTopicDisplay] = useState({})
  const [searchTabOpen, setSearchTabOpen] = useState(false)
  
  const [searchText, setSearchText] = useState("")
  const [animeSearchData, setAnimeSearchData] = useState([])
  const [errorShowing, setErrorShowing] = useState(false)

  const getData = async () => {
    const { data } = await supabase
      .from("ForumPosts")
      .select()
      .eq('id', post.id)
    
    return data
  }
  
  const updatePost = async (e) => {
    e.preventDefault()

    var currTitle = post.title;
    if(currTitle.trim() !== "") {
      await supabase
        .from("ForumPosts")
        .update(post)
        .eq("id", post.id)
    
      const data = await getData()
      setPost(data)
      location.reload()
    }
    else {
      setErrorShowing(true)
    }
  }

  const handleChange = (e) =>  {
    setPost((prev) => (
      {...prev, [e.target.name]: e.target.value})
    )
  }
  
  const toggleSearchTab = () => {
    setSearchTabOpen(!searchTabOpen)
  }
  
  const handleSearchText = (e) => {
    setSearchText(e.target.value)
  }

  const setPostTopic = ({ id, title, image }) => {
    setSearchTabOpen(false)
    setPost((prev) => ({...prev, anime_id: id}))
    setAnimeTopicDisplay((prev) =>
      ({...prev, anime_title: title, 
       anime_image: image}))
    setSearchText("")
  }

  // show selected anime topic on display
  useEffect(() => {
    const getAnimeInfo = async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${post.anime_id}`)
      const data = await response.json()
      const animeInfo = data.data;
      setPostTopic({id: post.anime_id, title: animeInfo.title_english, image: animeInfo.images.jpg.image_url})
    }
    getAnimeInfo();
  }, [])

  // refresh anime results on search
  useEffect(() => {
    const getAnimeResults = async () => {
      if(searchText.trim() !== "") {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchText}&sfw=true&limit=10`)
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

    const disableError = () => {
    setErrorShowing(false)
  }

  return (
  <div className="popup-bg">
    <div className="popup-div">
      <div className="popup-header">
        <input type="button" value="X" onClick={onClose} className="close-btn"/>
        <h2>Editing: {post.title}</h2>
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

      <input type="text" value={post.title} className={`text-field ${errorShowing ? "error-border" : ""}`} onFocus={disableError} name="title" onChange={handleChange} placeholder="Title"></input>
      <textarea rows="10" value={post.desc} className="text-field" name="desc" onChange={handleChange} placeholder="Description (optional)"></textarea>
      <input type="text" value={post.image_url} className="text-field" name="image_url" onChange={handleChange} placeholder="enter image url here"></input>
      <div className="row">
        <input type="button" className="post-btn" value="update" onClick={updatePost}/>
        {errorShowing && <h4 className="error-text red">Title cannot be empty</h4>}
      </div>
    </div>
  </div>
  )
}

export default EditForm
