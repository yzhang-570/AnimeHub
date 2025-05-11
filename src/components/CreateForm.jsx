import React, { useState } from 'react'
import './CreateForm.css'
import supabase from '../Client.jsx'
import userImg from '../assets/user-avatar.jpg'

function CreateForm({ onClose, userSession }) {

  const [newPost, setNewPost] = useState({ title: "", desc: "", image_url: "", display_name: "", profile_img: ""})

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
    setNewPost((prev) => (
        {...prev, [e.target.name]: e.target.value})
    )
    setNewPost((prev) => (
        {...prev, user_id: userSession.user.id})
      )
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
  
  return (
    <div className="popup-bg">
        <div className="popup-div">
            <div className="popup-header">
              <input type="button" value="X" onClick={onClose} className="close-btn"/>
              <h2>Create Post</h2>
            </div>
            <input type="text" className="text-field" name="title" onChange={handleChange} placeholder="Title"></input>
            <textarea rows="10" className="text-field" name="desc" onChange={handleChange} placeholder="Description (optional)"></textarea>
            <input type="text" className="text-field" name="image_url" onChange={handleChange} placeholder="enter image url here"></input>
            <input type="button" className="post-btn" value="post" onClick={createPost}/>
        </div>
    </div>
  )
}

export default CreateForm
