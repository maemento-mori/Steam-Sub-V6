import React, { useState, useEffect } from "react"; // Import useState
import "../styles/profile.css";

const Profile = ({ userData, profileData }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showStyle, setShowStyle] = useState(false);
  useEffect(() => {
    // console.log(userData)
    // console.log(userData !== undefined && userData !== null)
    setShowProfile(Object.keys(userData).length !== 0);
    // console.log(profileData)
    // console.log(Object.keys(profileData).length !== 0)

    setShowStyle(Object.keys(profileData).length !== 0);

    // Update the visibility of totalsContainer based on the totals prop
  }, [userData, profileData]);

  return (
    <>
      {showProfile && (
        <div
          className="header-info-holder"
          style={
            showStyle
              ? { backgroundImage: `url("${profileData.profileBG}")` }
              : { background: "#fff" }
          }
        >
          <a href={userData.profileUrl} className="avatar-holder">
            <img src={profileData.avatarFrame} className="avatar-frame"></img>
            <img src={profileData.avatar} className="avatar"></img>
          </a>
          <div className="player-text">
            <h1 className="header-title">
              <a href={userData.profileUrl} className="player-name">
                {profileData?.userName}
              </a>
            </h1>
            <ul className="player-info">
              <li>
                <span className="playerLevelLabel">
                  {profileData.playerLevel ? "Level " : ""}
                </span>
                <div
                  className={`friendPlayerLevel ${profileData.playerLevelClass}`}
                >
                  {profileData.playerLevel ? (
                    <span className="friendPlayerLevelNum">
                      {profileData?.playerLevel}{" "}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </li>
              <li>
                <span className="friendPlayerOnlineStatus">
                  {profileData?.onlineStatus}
                </span>
              </li>
              <li>
                <button className="friendPlayerProfileLink">
                  Go to Profile
                </button>
              </li>
            </ul>
          </div>
          <div className="favorite_badge">
            <div className="favorite_badge_icon">
              <img
                className="badge_icon small"
                src={profileData.favBadgeIcon}
              ></img>
            </div>
            <div className="favorite_badge_description">
              <div className="name">{profileData.favBadgeName}</div>
              <div className="xp">{profileData.favBadgeXP}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
