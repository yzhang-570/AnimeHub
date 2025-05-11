import React from 'react'
import "./PostPage.css"

import supabase from "../Client"

function Comment({ info }) {

  const deleteComment = async () => {
    await supabase
      .from("ForumComments")
      .delete()
      .eq("comment_id", info.comment_id)
    location.reload()
  }

  return (
    <div className="comment-div">
      <div onClick={deleteComment} className="thread-options-btn"><p>Delete</p></div>
      <img src={info.profile_img} />
      <h4><p>Comment:</p> {info.text}</h4>
      <p>{info.created_at}</p>
    </div>
  )
}

export default Comment
