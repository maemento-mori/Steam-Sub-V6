import React, { useState, useEffect } from "react"; // Import useState
import '../styles/profile.css';

const Profile = ({ userData, profileData }) => {
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    // console.log(userData)
    // console.log(userData !== undefined && userData !== null)
    setShowProfile(userData !== undefined && userData !== null)
    // Update the visibility of totalsContainer based on the totals prop
  }, [userData]);


  return (
    <>
    {showProfile && 
    (
      <div className="header-info-holder">
        <a href={userData.profileUrl} className="avatar-holder">
          <img src={profileData.avatarFrame} className="avatar-frame"></img>
          <img src={profileData.avatar} className="avatar"></img>
        </a>
        <div className="player-text">
          <h1 className="header-title">
            <a href={userData.profileUrl} className="player-name">{profileData?.userName}</a>
          </h1>
          <ul className="player-info">
            <li>
              {profileData.playerLevel ? "Level " : ""}
              <span className="friendPlayerLevel lvl_plus_css">{profileData.playerLevel ? profileData?.playerLevel : ""} </span>
            </li>
            <li>
              <span className="friendPlayerOnlineStatus">{profileData?.onlineStatus}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
    </>

  )

}

export default Profile;