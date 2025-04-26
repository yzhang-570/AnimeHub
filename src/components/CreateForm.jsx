import React, { useState } from 'react'
import './CreateForm.css'
import supabase from '../Client'

function CreateForm({ onClose }) {

  const [newPost, setNewPost] = useState({ title: "", desc: "", image_url: ""})

  const createPost = async (e) => {
    e.preventDefault()
    await supabase
        .from('ForumPosts')
        .insert(newPost)
    onClose()
    location.reload()
  }

  const handleChange = (e) =>  {
    setNewPost((prev) => (
        {...prev, [e.target.name]: e.target.value})
    )
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
