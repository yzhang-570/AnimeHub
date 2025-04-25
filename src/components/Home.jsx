import React from 'react'
import './Home.css'
import Popup from 'reactjs-popup'
import CreateForm from './CreateForm'

function Home() {
  return (
    <div className="main-div">
      <div className="content-div">
        <Popup trigger={<div className="createpost-div">
                <h2>What's happening?</h2>
                <button>+</button>
            </div>} modal>
            {close => ( //create custom close behavior
                <CreateForm onClose={() => close()}/>
            )}
        </Popup>
        <h1>main content</h1>
      </div>
      <div className="right-rec-div">
        <h1>some recs</h1>
      </div>
    </div>
  )
}

export default Home
