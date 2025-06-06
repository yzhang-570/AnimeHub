import React, { useState, useEffect } from 'react'
import './Navigation.css'
import './PostPage.css'

import EditForm from "./EditForm.jsx"
import Comment from "./Comment.jsx"
import HeartImg from '../assets/heart.png'
import CommentImg from '../assets/comment-dots.png'
import userImg from '../assets/user-avatar.jpg'

import { useParams, Link } from 'react-router-dom'
import Popup from 'reactjs-popup'

import { supabase } from '../Client.jsx'

function PostPage({ userSession }) {
  
  const params = useParams()

  const [info, setInfo] = useState({})
  const [animeDetails, setAnimeDetails] = useState({})
  const [newComment, setNewComment] = useState({text: "", post_id: params.id, user_id: "", display_name: "", profile_img:""})
  const [comments, setComments] = useState([])

  const getData = async () => {
    const { data } = await supabase
      .from("ForumPosts")
      .select()
      .eq('id', params.id)
    
    return data
  }
  
  const updateData = async () => {
    const data = await getData()
    setInfo(data)
  }

  const updateLikes = async (e) => {
    if(userSession) {
      const curr = await getData()
      const numLikes = curr[0].likes
      await supabase
        .from("ForumPosts")
        .update({likes: numLikes + 1})
        .eq("id", params.id)
      updateData()
    }
    else {
      console.log("ERROR: Please sign in")
      window.location = "/sign-in"
    }
  }
  
  const handleDelete = async (e) => {
    e.preventDefault()
    await supabase
      .from("ForumPosts")
      .delete()
      .eq("id", params.id)
      
    window.location = "/"
  }

  const handleCommentChange = (e) => {
    setNewComment((prev) => (
      {...prev, text: e.target.value}
    ))
    if(userSession) {
      if(Object.keys(userSession.user.user_metadata).length > 0) {
        setNewComment((prev) => (
          {...prev, display_name: userSession.user.user_metadata.name})
        )
        setNewComment((prev) => (
          {...prev, profile_img: userSession.user.user_metadata.avatar_url})
        )
      }
      else {
        setNewComment((prev) => (
          {...prev, display_name: "Guest"})
        )
        setNewComment((prev) => (
          {...prev, profile_img: userImg})
        )
      }
      setNewComment((prev) => (
        {...prev, user_id: userSession.user.id})
      )
    }
  }

  const handleCreateComment = async () => {
    if(userSession) {
      await supabase
      .from("ForumComments")
      .insert(newComment)
      .select()
      setNewComment({text: "", post_id: params.id})
      retrieveComments()
    }
    else {
      console.log("ERROR: Please sign in")
      window.location = "/sign-in"
    }
  }

  const retrieveComments = async () => {
    const { data } = await supabase
      .from("ForumComments")
      .select()
      .eq("post_id", params.id)
    setComments(data)
  }
  
  const getAnimeInfo = async () => {
    if(Object.keys(info).length !== 0 && info[0].anime_id) {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${info[0].anime_id}`)
      const data = await response.json()
      const animeInfo = data.data;
      setAnimeDetails(animeInfo)
    }
  }

  //ensure that anime details are updated in case anime id changes
  useEffect(() => {
    getAnimeInfo()
  }, [info])

  useEffect(() => {
    updateData()
    retrieveComments()
  }, [])

  return (
    <div className="main-div">
      <div className="thread-content-div">

        <div className="thread-div">
          {Object.keys(info).length !== 0 && 
            <>
              <div className="threadheader-div">
                {userSession && userSession.user.id === info[0].user_id && 
                <Popup trigger= {<div className="thread-options-btn"><p>More options</p></div>} arrow={false}>
                  <div className="options-div">
                    <input type="button" onClick={handleDelete} className="options-btn" value="Delete" />
                  </div>
                </Popup>}
                <div className="row">
                  <Link to={`/profile/${info[0].user_id}`}><img className="profile-img" src={info[0].profile_img}/></Link>
                  <div>
                    <Link to={`/profile/${info[0].user_id}`}><h3>{info[0].display_name}</h3></Link>
                    <h5>{info[0].created_at}</h5>
                  </div>
                </div>
                <div className="row">
                  <h1 className="title">{info[0].title}</h1>
                  {userSession && userSession.user.id === info[0].user_id && 
                  <Popup trigger={<input type="button" className="thread-options-btn" value="Edit" />} modal>
                      {close => ( //create custom close behavior
                          <EditForm onClose={() => close()} info={info}/>
                      )}
                  </Popup>}
                </div>
              </div>

              <h4>{info[0].desc}</h4>
              {info[0].img_url !== null && info[0].image_url !== "" && <img src={info[0].image_url} alt="Image failed to load"/>}

              <div className="btn-bar">
                <div onClick={updateLikes} className="interactive-div">
                    <img className="icon-img" src={HeartImg} />
                    <h3>{info[0].likes}</h3>
                </div>
                <a href="#create-comment-div">
                  <div className="interactive-div">
                      <img className="icon-img" src={CommentImg} />
                      <h3>{comments.length}</h3>
                  </div>
                </a>
              </div>
            </>
          }

          <div id="create-comment-div">
            <textarea rows="4" cols="83" value={newComment.text} onChange={handleCommentChange} className="comment-text" name="desc" placeholder="Make a comment"></textarea>
            <input type="button" className="comment-btn" value="Comment" onClick={handleCreateComment} />
          </div>
          <div className="all-comments-div">
            {comments && comments.map(comment => (
              <Comment key={comment.comment_id} info={comment} userSession={userSession}/>
            ))}
          </div>
        </div>
        
      </div>
      
      <div className="right-banner-div">
        {
          Object.keys(animeDetails).length !== 0 && 
          <div className="banner-img">
              <img src={animeDetails.images.jpg.large_image_url} />
              <div className="banner-text-div">
                {
                  animeDetails.title_english !== null ?
                  (<><h1 className="white banner-text bold">{animeDetails.title_english}</h1>
                  <h4 className="white banner-text">{animeDetails.title_japanese}</h4></>)
                  :
                  (<h1 className="white banner-text bold">{animeDetails.title_japanese}</h1>)
                }
                <div>
                  {animeDetails.studios.length !== 0 && <h4 className="white banner-text">Studio: {animeDetails.studios[0].name}</h4>}
                  {animeDetails.rating !== null && <h4 className="white banner-text">Rating: {animeDetails.rating}</h4>}
                  {animeDetails.demographics.length !== 0 && <h3 className="white banner-text">Genre: {animeDetails.demographics[0].name}</h3>}
                </div>
              </div>
          </div>
        }
      </div>

    </div>
  )
}

export default PostPage
