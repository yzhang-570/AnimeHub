import React from 'react'
import './CreateForm.css'

function AnimeInfoButton({ animeInfo }) {
  return (
    <div className="topic-option-btn">
        <img src={animeInfo.images.jpg.image_url}/>
        <div className="topic-option-text">
            <div>
            <h3>{animeInfo.title_english} (
                {animeInfo.year !== null ?
                (animeInfo.year)
                :
                ("Unknown")}
                )</h3>
            <p>{animeInfo.title_japanese}</p>
            </div>
            <p className="anime-desc">{animeInfo.synopsis}</p>
        </div>
    </div>
  )
}

export default AnimeInfoButton
