import React, { useState, useEffect } from 'react'
import './Post.css'

import { supabase } from '../Client'

function Post({ info }) {
  
  const [animeDetails, setAnimeDetails] = useState({})

  const updateLikes = async (e) => {
    const { data } = await supabase
      .from("ForumPosts")
      .select("likes")
      .eq("id", info.id)
    
    e.stopPropagation()
  }

  const getAnimeInfo = async () => {
    if(Object.keys(info).length !== 0 && info.anime_id !== null) {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${info.anime_id}`)
      const data = await response.json()
      const animeInfo = data.data;
      // console.log(animeInfo)
      setAnimeDetails(animeInfo)
    }
  }

  //ensure that anime details are updated in case anime id changes
  useEffect(() => {
    getAnimeInfo()
  }, [info])

  return (
    <div className="post-border">
      <div className="post-div">
        <div className="post-content">
          <div className="postheader-div">
            {/* <div className="options">
              <p>More options</p>
            </div> */}
            <div className="user-div">
              <img className="post-user-img" src={info.profile_img} alt="profile" />
              <div className="user-div-text">
                <h3 className="title post-title">{info.title}</h3>
                <h5>{info.display_name}</h5>
              </div>
            </div>
            <p>{info.created_at}</p>
          </div>
          {info.desc.length > 0 && <h4 className="post-desc">{info.desc}</h4>}
          <button onClick={updateLikes} className="likes-btn">
              <h4>{info.likes} Likes</h4>
          </button>
        </div>
        {Object.keys(animeDetails).length !== 0 && <img className="post-img" src={animeDetails.images.jpg.image_url}/>}
      </div>
    </div>
  )
}

export default Post
