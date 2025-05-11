import React from 'react'
import './Post.css'
import supabase from '../Client'

function Post({ info }) {
  
  const updateLikes = async (e) => {
    const { data } = await supabase
      .from("ForumPosts")
      .select("likes")
      .eq("id", info.id)
    
    e.stopPropagation()
  }

  return (
    <div className="post-border">
      <div className="post-div">
        <div className="postheader-div">
            <div className="options">
              <p>More options</p>
            </div>
            <div className="user-div">
              <img className="post-user-img" src={info.profile_img} />
              <h3 className="title">{info.title}</h3>
            </div>
            <div>
              <p>{info.created_at}</p>
            </div>
        </div>
        {info.desc.length > 0 && <h4>{info.desc}</h4>}
        <button onClick={updateLikes} className="likes-btn">
            <h4>{info.likes} Likes</h4>
        </button>
      </div>
    </div>
  )
}

export default Post
