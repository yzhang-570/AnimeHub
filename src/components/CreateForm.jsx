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
            <input type="button" value="close" onClick={onClose}/>
            <h2>Create Post</h2>
            <input type="text" name="title" onChange={handleChange} placeholder="Title"></input>
            <textarea rows="10" name="desc" onChange={handleChange} placeholder="Description (optional)"></textarea>
            <input type="text" name="image_url" onChange={handleChange} placeholder="enter image url here"></input>
            <input type="button" value="post" onClick={createPost}/>
        </div>
    </div>
  )
}

export default CreateForm
