import React from 'react'
import Profile from '../../../../assets/aboutMe.jpg'
import './style.css'

const ProfileBar = () => {
  return (
    <div className="profile-bar-component">
      <div className="profile-bar-card">
        <div className="profile-bar-card-details">
          <div className="profile-bar-card-img">
            <img src={Profile} alt="" />
          </div>
          <div className="profile-bar-card-user-details">
            <p className="profile-bar-card-user-name">Amen Edoha</p>
            <p className="profile-bar-card-user-email">amenedoha@gmail.com</p>
          </div>
        </div>
        <div className="profile-bar-card-actions">
          <button>View Porfolio</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileBar
