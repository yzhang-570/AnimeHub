import React, { useState, useEffect } from 'react'
import '../App.css'
import './Thread.css'

import { useParams } from 'react-router-dom'

import supabase from '../Client.jsx'

function Thread() {
  
  const [info, setInfo] = useState({})

  const params = useParams()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase
        .from("ForumPosts")
        .select()
        .eq('id', params.id)
      
        setInfo(data)
    }
    getData()
  }, [])

  console.log(info)

  return (
    <div className="main-div">
      <div className="thread-content-div">

        <div className="thread-div">
          {
            Object.keys(info).length !== 0 && 
            <>
              <div className="postheader-div">
              <div>
                <h1 className="title">{info[0].title}</h1>
                <h4>{info[0].created_at}</h4>
              </div>
                <p>More options</p>
              </div>
              <h4>{info[0].desc}</h4>

              <div className="btn-bar">
                <div className="interactive-div">
                    <h3>{info[0].likes} Likes</h3>
                </div>
                <div className="interactive-div">
                    <h3>{info[0].likes} Comments</h3>
                </div>
              </div>
            </>
          }

          <div className="create-comment-div">
            <textarea rows="4" cols="85" className="comment-text" name="desc" placeholder="Make a comment"></textarea>
            <button>Comment</button>
          </div>
        </div>

      </div>
      <div className="right-banner-div">
        <div className="img-div">
        </div>
      </div>
    </div>
  )
}

export default Thread
