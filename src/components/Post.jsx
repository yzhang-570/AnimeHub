import React from 'react'
import './Post.css'

function Post({ info }) {
  console.log(info)
  return (
    <div className="post-border">
      <div className="post-div">
        <div className="postheader-div">
            <div>
              <h3 className="title">{info.title}</h3>
              <p>{info.created_at}</p>
            </div>
              <p>More options</p>
        </div>
        <h4>{info.desc}</h4>
        <div className="likes-div">
            <h4>{info.likes} Likes</h4>
        </div>
      </div>
    </div>
  )
}

export default Post
