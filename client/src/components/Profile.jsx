import React, { useState, useEffect } from 'react' // Import useState
import '../styles/profile.css'

const Profile = ({ userData, profileData }) => {
  const [showProfile, setShowProfile] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const [showStyle, setShowStyle] = useState(false)
  useEffect(() => {
    setShowProfile(Object.keys(userData).length !== 0)
    setShowStyle(Object.keys(profileData).length !== 0)
    setShowBadge(profileData.favBadgeIcon !== undefined)

    // Update the visibility of totalsContainer based on the totals prop
  }, [userData, profileData])

  return (
    <>
      {showProfile && (
        <div
          className="header-info-holder"
          style={showStyle ? { backgroundImage: `url("${profileData.profileBG}")` } : { background: '#fff' }}
        >
          <a href={userData.profileUrl} className="avatar-holder" title="Player avatar">
            <img src={profileData.avatarFrame} className="avatar-frame" alt="Avatar Frame"></img>
            <img src={profileData.avatar} className="avatar" alt="Player avatar"></img>
          </a>
          <div className="player-text">
            <h1 className="header-title">
              <a href={userData.profileUrl} className="player-name" title={`${profileData.userName}'s Steam profile`}>
                {profileData?.userName}
              </a>
            </h1>
            <ul className="player-info">
              <li>
                <span className="playerLevelLabel">{profileData.playerLevel ? 'Level ' : ''}</span>
                <div className={`friendPlayerLevel ${profileData.playerLevelClass}`}>
                  {profileData.playerLevel ? (
                    <span className="friendPlayerLevelNum">{profileData?.playerLevel} </span>
                  ) : (
                    ''
                  )}
                </div>
              </li>
              <li>
                <span className="friendPlayerOnlineStatus">{profileData?.onlineStatus}</span>
              </li>
              <li>
                <button
                  className="friendPlayerProfileLink"
                  title={`${profileData.userName}'s Steam profile`}
                  target="_blank"
                  onClick={function () {
                    window.open(userData.profileUrl)
                  }}
                >
                  Go to Profile
                </button>
              </li>
            </ul>
          </div>
          {showBadge && (
            <div className="favorite_badge">
              <div className="favorite_badge_icon">
                <img className="badge_icon small" src={profileData.favBadgeIcon} alt="Favorite badge"></img>
              </div>
              <div className="favorite_badge_description">
                <div className="name">{profileData.favBadgeName}</div>
                <div className="xp">{profileData.favBadgeXP}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Profile
