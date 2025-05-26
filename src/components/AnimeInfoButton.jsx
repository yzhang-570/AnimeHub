import React from 'react'
import './CreateForm.css'

function AnimeInfoButton({ animeInfo, setPostTopic }) {

  const handleClick = () => {
    if(animeInfo.title_english === null) {
        setPostTopic({
        "id": animeInfo.mal_id,
        "title": animeInfo.title,
        "image": animeInfo.images.jpg.image_url
      })
    }
    else {
      setPostTopic({
        "id": animeInfo.mal_id,
        "title": animeInfo.title_english,
        "image": animeInfo.images.jpg.image_url
      })
    }
  }

  return (
    <div className="topic-option-btn" onClick={handleClick}>
        <img src={animeInfo.images.jpg.image_url}/>
        <div className="topic-option-text">
            <div>
            {animeInfo.title_english !== null ?
              (<h3>{animeInfo.title_english}
              ({animeInfo.year !== null ?
                (animeInfo.year)
                :
                ("Unknown")}
              )</h3>)
              :
              ((<h3>{animeInfo.title}
              ({animeInfo.year !== null ?
                (animeInfo.year)
                :
                ("Unknown")}
              )</h3>))}
            <p>{animeInfo.title_japanese}</p>
            </div>
            <p className="anime-desc">{animeInfo.synopsis}</p>
        </div>
    </div>
  )
}

export default AnimeInfoButton
