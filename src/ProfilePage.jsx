import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ProfilePage.css'
import { supabase, supabaseAdmin } from './Client'

function ProfilePage() {

  const [userInfo, setUserInfo] = useState({})
  const params = useParams()

  useEffect(() => {
    const getUserData = async () => {
      const data = await supabaseAdmin.auth.admin.getUserById(params.id)
      setUserInfo(data)
    }
    getUserData()
  }, [])

  console.log(userInfo)

  return (
    <div className="profile-main-div">
      {userInfo && userInfo.data && Object.keys(userInfo.data.user.user_metadata).length > 0 ?
      (<h1>Welcome to {userInfo.data.user.user_metadata.name}'s Profile</h1>)
      :
      (<h1>Welcome to a Guest Profile</h1>)
      }
    </div>
  )
}

export default ProfilePage
