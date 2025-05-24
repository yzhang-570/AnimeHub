import React, { useState } from 'react'
import './CreateForm.css'

import { supabase } from '../Client'

function EditForm({ onClose, info }) {

  const [post, setPost] = useState(info[0])

  const getData = async () => {
  const { data } = await supabase
    .from("ForumPosts")
    .select()
    .eq('id', post.id)
  
  return data
  }
  
  const updatePost = async (e) => {
  e.preventDefault()
  await supabase
    .from("ForumPosts")
    .update(post)
    .eq("id", post.id)
  
    const data = await getData()
  setPost(data)
  onClose()
  location.reload()
  }

  const handleChange = (e) =>  {
  setPost((prev) => (
    {...prev, [e.target.name]: e.target.value})
  )
  }
  
  return (
  <div className="popup-bg">
    <div className="popup-div">
      <div className="popup-header">
        <input type="button" value="X" onClick={onClose} className="close-btn"/>
        <h2>Editing: {post.title}</h2>
      </div>
      <input type="text" value={post.title} className="text-field" name="title" onChange={handleChange} placeholder="Title"></input>
      <textarea rows="10" value={post.desc} className="text-field" name="desc" onChange={handleChange} placeholder="Description (optional)"></textarea>
      <input type="text" value={post.image_url} className="text-field" name="image_url" onChange={handleChange} placeholder="enter image url here"></input>
      <input type="button" onClick={updatePost} className="post-btn" value="update"/>
    </div>
  </div>
  )
}

export default EditForm
