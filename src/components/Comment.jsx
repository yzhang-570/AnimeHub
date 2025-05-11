import React from 'react'
import "./PostPage.css"

import supabase from "../Client"

function Comment({ info, userSession }) {

  const deleteComment = async () => {
    await supabase
      .from("ForumComments")
      .delete()
      .eq("comment_id", info.comment_id)
    location.reload()
  }

  console.log(info)

  return (
    <div className="comment-div">
      {userSession && userSession.user.id === info.user_id && <div onClick={deleteComment} 
        className="thread-options-btn"><p>Delete</p></div>}
      <div className="row">
        <img className="profile-img" src={info.profile_img} />
        <div>
          <h4><p>{info.display_name}</p> {info.text}</h4>
          <p>{info.created_at}</p>
        </div>
      </div>
    </div>
  )
}

export default Comment
