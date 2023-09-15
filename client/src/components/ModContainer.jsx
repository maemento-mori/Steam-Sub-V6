import React, { useState, useEffect } from 'react'
import '../styles/modContainer.css'
import $ from 'jquery'
import SortButtons from './SortButtons' // Import the SortButtons component

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'

// const element =

const ModContainer = ({ mods, submit, setSubmit }) => {
  // const [prevSubscribers, setPrevSubscribers] = useState({});
  const [differences, setDifferences] = useState({})
  const [showMods, setShowMods] = useState(false)

  const [prevSubscribers, setPrevSubscribers] = useState({})
  const [prevAwards, setPrevAwards] = useState({})
  const [prevComments, setPrevComments] = useState({})
  const [prevRatings, setPrevRatings] = useState({})
  const [prevFavorites, setPrevFavorites] = useState({})
  const [prevUniqueVisitorsCount, setPrevUniqueVisitorsCount] = useState({})
  const [prevCollections, setPrevCollections] = useState({})

  const [subscribersDifferences, setSubscribersDifferences] = useState({})
  const [awardsDifferences, setAwardsDifferences] = useState({})
  const [commentsDifferences, setCommentsDifferences] = useState({})
  const [ratingsDifferences, setRatingsDifferences] = useState({})
  const [favoritesDifferences, setFavoritesDifferences] = useState({})
  const [uniqueVisitorsCountDifferences, setUniqueVisitorsCountDifferences] = useState({})
  const [collectionsDifferences, setCollectionsDifferences] = useState({})

  const [fade, setFade] = useState(false)

  const [sortOrder, setSortOrder] = useState('desc') // State for sorting order
  const [sortBy, setSortBy] = useState('subscribers') // State for sorting criteria
  const [selectedGame, setSelectedGame] = useState(null) // State to store the selected game

  const [showModImages, setShowModImages] = useState(true)

  const updateDifferences = (modIndex, newValue, oldValue, valueKey) => {
    if (oldValue !== undefined) {
      if (newValue !== oldValue) {
        // Calculate the difference when the value changes
        return newValue - oldValue
      }
    }
    return valueKey ? differences[modIndex] || 0 : 0
  }

  const updateSubscribersDifference = (modIndex, newSubscribers, modName) => {
    const oldValue = prevSubscribers[modIndex]
    return updateDifferences(modIndex, newSubscribers, oldValue, 'subscribers')
  }

  const updateAwardsDifference = (modIndex, newAwards, modName) => {
    const oldValue = prevAwards[modIndex]
    return updateDifferences(modIndex, newAwards, oldValue, 'awards')
  }

  const updateCommentsDifference = (modIndex, newComments, modName) => {
    const oldValue = prevComments[modIndex]
    return updateDifferences(modIndex, newComments, oldValue, 'comments')
  }

  const updateRatingsDifference = (modIndex, newRatings, modName) => {
    const oldValue = prevRatings[modIndex]
    return updateDifferences(modIndex, newRatings, oldValue, 'ratings')
  }

  const updateFavoritesDifference = (modIndex, newFavorites, modName) => {
    const oldValue = prevFavorites[modIndex]
    return updateDifferences(modIndex, newFavorites, oldValue, 'favorites')
  }

  const updateUniqueVisitorsCountDifference = (modIndex, newFavorites, modName) => {
    const oldValue = prevUniqueVisitorsCount[modIndex]
    return updateDifferences(modIndex, newFavorites, oldValue, 'uniqueVisitorsCount')
  }

  const updateCollectionsDifference = (modIndex, newFavorites, modName) => {
    const oldValue = prevCollections[modIndex]
    return updateDifferences(modIndex, newFavorites, oldValue, 'collections')
  }

  useEffect(() => {
    if (submit === true) {
      setSelectedGame(null)
      setSortBy('subscribers')
      setSubmit(false)
    }
    const newSubscribers = {}
    const newAwards = {}
    const newComments = {}
    const newRatings = {}
    const newFavorites = {}
    const newUniqueVisitorsCount = {}
    const newCollections = {}

    const newSubscribersDifferences = {}
    const newAwardsDifferences = {}
    const newCommentsDifferences = {}
    const newRatingsDifferences = {}
    const newFavoritesDifferences = {}
    const newUniqueVisitorsCountDifferences = {}
    const newCollectionsDifferences = {}

    setShowMods(Object.keys(mods).length > 1)

    Object.keys(mods).forEach((modIndex) => {
      newSubscribers[modIndex] = mods[modIndex].subscribers
      newAwards[modIndex] = mods[modIndex].awards
      newComments[modIndex] = mods[modIndex].comments
      newRatings[modIndex] = mods[modIndex].ratings
      newFavorites[modIndex] = mods[modIndex].favorites
      newUniqueVisitorsCount[modIndex] = mods[modIndex].uniqueVisitorsCount
      newCollections[modIndex] = mods[modIndex].fCollections

      newSubscribersDifferences[modIndex] = updateSubscribersDifference(modIndex, mods[modIndex].subscribers)
      newAwardsDifferences[modIndex] = updateAwardsDifference(modIndex, mods[modIndex].awards)
      newCommentsDifferences[modIndex] = updateCommentsDifference(modIndex, mods[modIndex].comments)
      newRatingsDifferences[modIndex] = updateRatingsDifference(modIndex, mods[modIndex].ratings)
      newFavoritesDifferences[modIndex] = updateFavoritesDifference(modIndex, mods[modIndex].favorites)
      newUniqueVisitorsCountDifferences[modIndex] = updateUniqueVisitorsCountDifference(
        modIndex,
        mods[modIndex].uniqueVisitorsCount
      )
      newCollectionsDifferences[modIndex] = updateCollectionsDifference(modIndex, mods[modIndex].collections)
    })

    setPrevSubscribers(newSubscribers)
    setPrevAwards(newAwards)
    setPrevComments(newComments)
    setPrevRatings(newRatings)
    setPrevFavorites(newFavorites)
    setPrevUniqueVisitorsCount(newUniqueVisitorsCount)
    setPrevCollections(newCollections)

    setSubscribersDifferences(newSubscribersDifferences)
    setAwardsDifferences(newAwardsDifferences)
    setCommentsDifferences(newCommentsDifferences)
    setRatingsDifferences(newRatingsDifferences)
    setFavoritesDifferences(newFavoritesDifferences)
    setUniqueVisitorsCountDifferences(newUniqueVisitorsCountDifferences)
    setCollectionsDifferences(newCollectionsDifferences)

    setTimeout(() => {
      setFade(false)
    }, 100)

    setTimeout(() => {
      setFade(true)
    }, 4000)
  }, [mods])

  // () stats button click
  const handleStatsButtonClick = (event) => {
    let ogHeight = $('.front').outerHeight()
    let newHeight = $('.back').outerHeight()

    let difference = newHeight - ogHeight
    const closestMod = event.currentTarget.closest('.mod')
    const flipper = closestMod.querySelector('.flip3D')

    if (difference > 1) {
      flip(flipper, closestMod, difference)
    } else {
      flip(flipper, closestMod, -Math.abs(difference))
    }
  }

  // () flip to back
  const flip = (el, closestModAvail, difference) => {
    if (el.getAttribute('flipped') === 'true') {
      el.children[0].style.transform = 'perspective(600px) rotateY(180deg)'
      el.children[1].style.transform = 'perspective(600px) rotateY(0deg)'
      el.setAttribute('flipped', 'false')
      $(closestModAvail).find('.frontInvis').css('position', 'relative')
      $(closestModAvail).find('.front').css('position', 'absolute')
      $(closestModAvail).find('.back').css('position', 'absolute')
      // let frontHeight = $(".frontInvis").outerHeight()
      // $(closestModAvail).find(".flip3D").animate({ height: frontHeight })
      // // $(closestModAvail).animate({ height: '-=' + difference })
    } else {
      el.children[0].style.transform = 'perspective(600px) rotateY(0deg)'
      el.children[1].style.transform = 'perspective(600px) rotateY(-180deg)'
      el.setAttribute('flipped', 'true')
      $(closestModAvail).find('.back').css('position', 'relative')
      $(closestModAvail).find('.frontInvis').css('position', 'absolute')
      $(closestModAvail).find('.front').css('position', 'absolute')
      // let backHeight = $(".back").outerHeight()
      // $(closestModAvail).find(".flip3D").animate({ height: backHeight })
      // // $(closestModAvail).animate({ height: '+=' + difference })
    }
  }

  // () flip to front
  const flip2 = (el, closestModAvail, difference) => {
    if (el.getAttribute('flipped') === 'true') {
      el.children[0].style.transform = 'perspective(600px) rotateY(180deg)'
      el.children[1].style.transform = 'perspective(600px) rotateY(0deg)'
      el.setAttribute('flipped', 'false')
      $(closestModAvail).find('.frontInvis').css('position', 'relative')
      $(closestModAvail).find('.front').css('position', 'absolute')
      $(closestModAvail).find('.back').css('position', 'absolute')
      // let frontHeight = $(".frontInvis").outerHeight()
      // $(closestModAvail).find(".flip3D").animate({ height: frontHeight })
      // // $(closestModAvail).animate({ height: '-=' + difference })
    } else {
      el.children[0].style.transform = 'perspective(600px) rotateY(0deg)'
      el.children[1].style.transform = 'perspective(600px) rotateY(-180deg)'
      el.setAttribute('flipped', 'true')
      $(closestModAvail).find('.back').css('position', 'relative')
      $(closestModAvail).find('.frontInvis').css('position', 'absolute')
      $(closestModAvail).find('.front').css('position', 'absolute')
      // let backHeight = $(".back").outerHeight()
      // $(closestModAvail).find(".flip3D").animate({ height: backHeight })
      // // $(closestModAvail).animate({ height: '+=' + difference })
    }
  }

  // () close button function
  const handleCloseButtonClick = (event) => {
    let ogHeight = $('.front').outerHeight()
    let newHeight = $('.back').outerHeight()

    let difference = newHeight - ogHeight
    const closestMod = event.currentTarget.closest('.mod')
    const flipper = closestMod.querySelector('.flip3D')
    if (difference > 1) {
      flip2(flipper, closestMod, difference)
    } else {
      flip2(flipper, closestMod, -Math.abs(difference))
    }
  }

  // () Function to sort mods based on the selected criteria
  const sortMods = (criteria) => {
    const modsArray = Object.values(mods)
    // console.log(criteria)

    if (criteria === 'gameName') {
      // Sort by gameName, and then by the specified criteria (e.g., subscribers)
      modsArray.sort((modA, modB) => {
        const gameNameA = modA.gameName
        const gameNameB = modB.gameName
        if (gameNameA < gameNameB) return sortOrder === 'asc' ? -1 : 1
        if (gameNameA > gameNameB) return sortOrder === 'asc' ? 1 : -1
        // If gameName is the same, use the specified criteria for secondary sorting
        const valueA = modA[sortBy]
        const valueB = modB[sortBy]
        if (sortOrder === 'asc') {
          return valueA - valueB
        } else {
          return valueB - valueA
        }
      })
    } else {
      // Sort by the specified criteria
      modsArray.sort((modA, modB) => {
        const valueA = modA[criteria]
        console.log(valueA)
        const valueB = modB[criteria]
        console.log(valueB)
        if (sortOrder === 'asc') {
          return valueA - valueB
        } else {
          return valueB - valueA
        }
      })
    }

    return modsArray
  }

  // Handle click on the sort button for different criteria
  const handleSortButtonClick = (criteria) => {
    // console.log(selectedGame)
    // console.log(criteria)
    // Toggle the sorting order if the same criteria is clicked again
    if (sortBy === criteria) {
      const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
      setSortOrder(newSortOrder)
    } else {
      // Set the new sorting criteria and default to ascending order
      setSortBy(criteria)
      setSortOrder('desc')
    }
  }

  // Get the sorted mod items based on the selected criteria
  const sortedMods = sortMods(sortBy)

  let arrayModItems

  if (selectedGame) {
    // Filter mods based on the selected game
    arrayModItems = Object.keys(sortedMods)
      .filter((modIndex) => sortedMods[modIndex].gameName === selectedGame)
      .map((modIndex) => {
        const mod = sortedMods[modIndex]
        // >> const difference = differences[modIndex]; // Use differences from state

        const subscriberDifference = subscribersDifferences[modIndex]
        const awardDifference = awardsDifferences[modIndex]
        const commentDifference = commentsDifferences[modIndex]
        const ratingDifference = ratingsDifferences[modIndex]
        const favoritesDifference = favoritesDifferences[modIndex]
        const uniqueVisitorsDifference = uniqueVisitorsCountDifferences[modIndex]
        const collectionsDifference = collectionsDifferences[modIndex]

        const handleShareButtonClick = (event) => {
          navigator.clipboard.writeText(mod.link)

          const buttonText = $(event.target).find('.shareButtonText')

          $(buttonText).fadeOut(300, function () {
            $(buttonText).html('Link Copied').fadeIn(300)
            setTimeout(() => {
              $(buttonText).fadeOut(400, function () {
                $(buttonText).html('Share').fadeIn(400)
              })
            }, 2300)
          })
        }

        return (
          <>
            <div className="mod" key={modIndex}>
              <div className="modImageContainer">
                <a name="ModImageLink" className="modImageLink" href={mod.link} target="_blank" rel="noreferrer">
                  <span className="sr-only">Link to mod page</span>
                  <img className="modImage" src={mod.image} alt="Mod preview" title={mod.name}></img>
                </a>
              </div>
              <h3 className="smallTitle">
                <a href={mod.link} title={mod.name} target="_blank" rel="noreferrer">
                  {mod.name}
                </a>
              </h3>
              <div className={'flip3D'} flipped="false">
                <div className="back">
                  <div className="closeButtonContainer">
                    <span className="closeButton" onClick={handleCloseButtonClick} title="Close extra mod statistics">
                      &#9747;
                    </span>
                  </div>
                  <table className="smallModStatistics">
                    <tbody>
                      <tr>
                        <td>
                          <FontAwesomeIcon
                            icon={faCloudArrowUp}
                            className="faB cloudArrowUpB smallTableIcon backTable"
                          />
                        </td>
                        <td className="smallTableLabel backTable">Uploaded</td>
                        <td className="smallTableValue backTable">{mod.uploadDate}</td>
                      </tr>

                      <tr>
                        <td>
                          <FontAwesomeIcon
                            icon={faSquareArrowUpRight}
                            className="faB squareArrowUpRightB smallTableIcon backTable"
                          />
                        </td>
                        <td className="smallTableLabel backTable">Updated</td>
                        <td className="smallTableValue backTable">{mod.updateDate}</td>
                      </tr>

                      <tr className="filesizeRow">
                        <td>
                          <FontAwesomeIcon icon={faFileLines} className="faB fileLinesB smallTableIcon backTable" />
                        </td>
                        <td className="smallTableLabel backTable">Filesize</td>
                        <td className="smallTableValue backTable">{mod.fileSize}</td>
                      </tr>
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faFolderOpen} className="faB FolderOpenB smallTableIcon backTable" />
                        </td>
                        <td className="smallTableLabel backTable">Collections</td>
                        <td className="smallTableValue backTable">
                          {String(mod.collections).replace(/(.)(?=(\d{3})+$)/g, '$1,')}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="tagsContainer">
                    <div className="tagsRow">
                      {mod.workshopTags ? (
                        mod.workshopTags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="tag" title={tag}>
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span>No tags available.</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="front">
                  <table className="smallModStatistics">
                    <tbody>
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faEye} className="faM viewsIconM" />
                        </td>
                        <td className="smallTableLabel">Views</td>
                        <td className="smallTableValue">
                          {String(mod.uniqueVisitorsCount).replace(/(.)(?=(\d{3})+$)/g, '$1,')}
                        </td>
                        <td>
                          {uniqueVisitorsDifference !== 0 ? (
                            <span
                              className={`fade ${fade ? 'fade-out' : ''} ${
                                uniqueVisitorsDifference > 0 ? 'increase' : 'decrease'
                              }`}
                            >
                              {uniqueVisitorsDifference > 0 ? '+' : ''}
                              {uniqueVisitorsDifference}
                            </span>
                          ) : (
                            <span className="invis">{uniqueVisitorsDifference ? '' : '+0'}</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faUser} className="faM subsIconM" />
                        </td>
                        <td className="smallTableLabel">Subscribers</td>
                        <td className="smallTableValue">
                          {String(mod.subscribers).replace(/(.)(?=(\d{3})+$)/g, '$1,')}
                        </td>
                        <td>
                          {subscriberDifference !== 0 ? (
                            <span
                              className={`fade ${fade ? 'fade-out' : ''} ${
                                subscriberDifference > 0 ? 'increase' : 'decrease'
                              }`}
                            >
                              {subscriberDifference > 0 ? '+' : ''}
                              {subscriberDifference}
                            </span>
                          ) : (
                            <span className="invis">{subscriberDifference ? '' : '+0'}</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faStar} className="faM AwardsIconM" />
                        </td>
                        <td className="smallTableLabel">Awards</td>
                        <td className="smallTableValue">{String(mod.awards).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                        <td>
                          {awardDifference !== 0 ? (
                            <span
                              className={`fade ${fade ? 'fade-out' : ''} ${
                                awardDifference > 0 ? 'increase' : 'decrease'
                              }`}
                            >
                              {awardDifference > 0 ? '+' : ''}
                              {awardDifference}
                            </span>
                          ) : (
                            <span className="invis">{awardDifference ? '' : '+0'}</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faComment} className="faM commentsIconM" />
                        </td>
                        <td className="smallTableLabel">Comments</td>
                        <td className="smallTableValue">{String(mod.comments).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                        <td>
                          {commentDifference !== 0 ? (
                            <span
                              className={`fade ${fade ? 'fade-out' : ''} ${
                                commentDifference > 0 ? 'increase' : 'decrease'
                              }`}
                            >
                              {commentDifference > 0 ? '+' : ''}
                              {commentDifference}
                            </span>
                          ) : (
                            <span className="invis">{commentDifference ? '' : '+0'}</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faHeart} className="faM favsIconM" />
                        </td>
                        <td className="smallTableLabel">Favorites</td>
                        <td className="smallTableValue">{String(mod.favorites).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                        <td>
                          {favoritesDifference !== 0 ? (
                            <span
                              className={`fade ${fade ? 'fade-out' : ''} ${
                                favoritesDifference > 0 ? 'increase' : 'decrease'
                              }`}
                            >
                              {favoritesDifference > 0 ? '+' : ''}
                              {favoritesDifference}
                            </span>
                          ) : (
                            <span className="invis">{favoritesDifference ? '' : '+0'}</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faChartSimple} className="faM ratingsIconM" />
                        </td>
                        <td className="smallTableLabel">Ratings</td>
                        <td className="smallTableValue">{String(mod.ratings).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                        <td>
                          {ratingDifference !== 0 ? (
                            <span
                              className={`fade ${fade ? 'fade-out' : ''} ${
                                ratingDifference > 0 ? 'increase' : 'decrease'
                              }`}
                            >
                              {ratingDifference > 0 ? '+' : ''}
                              {ratingDifference}
                            </span>
                          ) : (
                            <span className="invis">{ratingDifference ? '' : '+0'}</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={4} className="modstars" title="Mod rating">
                          <img src={mod.starsLink} alt="Mod stars rating"></img>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="buttonHolder">
                    <div className="statsButtonContainer">
                      <button
                        onClick={handleStatsButtonClick}
                        className="statsButton"
                        key={modIndex}
                        title="Show mod statistics"
                      >
                        <span>Stats</span>
                      </button>
                    </div>

                    <div className="modLinkButtonContainer">
                      <button
                        className="linkButton"
                        key={modIndex}
                        title={`${mod.link} (New tab)`}
                        onClick={function () {
                          window.open(mod.link)
                        }}
                      >
                        <span>Go to Mod</span>
                      </button>
                    </div>

                    <div className="shareButtonContainer">
                      <button
                        onClick={handleShareButtonClick}
                        className="shareButton"
                        title="Copy link to clipboard"
                        key={modIndex}
                      >
                        <span className="shareButtonText">Share</span>
                      </button>
                    </div>
                  </div>

                  {showModImages && (
                    <div className="gameTitle">
                      <a href={mod.gameHubLink}>
                        <img
                          className="gameImage"
                          title={mod.gameName}
                          src={mod.gameImage}
                          alt="Game the mod is from"
                        ></img>
                      </a>
                    </div>
                  )}
                </div>
                <div className="frontInvis">
                  <table className="smallModStatistics">
                    <tbody>
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faEye} className="faM viewsIconM" />
                        </td>
                        <td className="smallTableLabel">Views</td>
                        <td className="smallTableValue">
                          {String(mod.uniqueVisitorsCount).replace(/(.)(?=(\d{3})+$)/g, '$1,')}
                        </td>
                        <td>
                          {uniqueVisitorsDifference !== 0 ? (
                            <span
                              className={`fade ${fade ? 'fade-out' : ''} ${
                                uniqueVisitorsDifference > 0 ? 'increase' : 'decrease'
                              }`}
                            >
                              {uniqueVisitorsDifference > 0 ? '+' : ''}
                              {uniqueVisitorsDifference}
                            </span>
                          ) : (
                            <span className="invis">{uniqueVisitorsDifference ? '' : '+0'}</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faUser} className="faM subsIconM" />
                        </td>
                        <td className="smallTableLabel">Subscribers</td>
                        <td className="smallTableValue">
                          {String(mod.subscribers).replace(/(.)(?=(\d{3})+$)/g, '$1,')}
                        </td>
                        <td>
                          {subscriberDifference !== 0 ? (
                            <span
                              className={`fade ${fade ? 'fade-out' : ''} ${
                                subscriberDifference > 0 ? 'increase' : 'decrease'
                              }`}
                            >
                              {subscriberDifference > 0 ? '+' : ''}
                              {subscriberDifference}
                            </span>
                          ) : (
                            ''
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faStar} className="faM AwardsIconM" />
                        </td>
                        <td className="smallTableLabel">Awards</td>
                        <td className="smallTableValue">{String(mod.awards).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                        <td>
                          {awardDifference !== 0 ? (
                            <span
                              className={`fade ${fade ? 'fade-out' : ''} ${
                                awardDifference > 0 ? 'increase' : 'decrease'
                              }`}
                            >
                              {awardDifference > 0 ? '+' : ''}
                              {awardDifference}
                            </span>
                          ) : (
                            ''
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faComment} className="faM commentsIconM" />
                        </td>
                        <td className="smallTableLabel">Comments</td>
                        <td className="smallTableValue">{String(mod.comments).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                        <td>
                          {commentDifference !== 0 ? (
                            <span
                              className={`fade ${fade ? 'fade-out' : ''} ${
                                commentDifference > 0 ? 'increase' : 'decrease'
                              }`}
                            >
                              {commentDifference > 0 ? '+' : ''}
                              {commentDifference}
                            </span>
                          ) : (
                            ''
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faHeart} className="faM favsIconM" />
                        </td>
                        <td className="smallTableLabel">Favorites</td>
                        <td className="smallTableValue">{String(mod.favorites).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                        <td>
                          {favoritesDifference !== 0 ? (
                            <span
                              className={`fade ${fade ? 'fade-out' : ''} ${
                                favoritesDifference > 0 ? 'increase' : 'decrease'
                              }`}
                            >
                              {favoritesDifference > 0 ? '+' : ''}
                              {favoritesDifference}
                            </span>
                          ) : (
                            <span className="invis">{favoritesDifference ? '' : '+0'}</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faChartSimple} className="faM ratingsIconM" />
                        </td>
                        <td className="smallTableLabel">Ratings</td>
                        <td className="smallTableValue">{String(mod.ratings).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                        <td>
                          {ratingDifference !== 0 ? (
                            <span
                              className={`fade ${fade ? 'fade-out' : ''} ${
                                ratingDifference > 0 ? 'increase' : 'decrease'
                              }`}
                            >
                              {ratingDifference > 0 ? '+' : ''}
                              {ratingDifference}
                            </span>
                          ) : (
                            ''
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={4} className="modstars" title="Mod rating">
                          <img src={mod.starsLink} alt="Mod stars rating"></img>
                        </td>
                      </tr>
                      <tr></tr>
                    </tbody>
                  </table>

                  <div className="buttonHolder">
                    <div className="statsButtonContainer">
                      <button
                        onClick={handleStatsButtonClick}
                        className="statsButton"
                        key={modIndex}
                        title="Show mod statistics"
                      >
                        <span>Stats</span>
                      </button>
                    </div>

                    <div className="modLinkButtonContainer">
                      <button
                        className="linkButton"
                        key={modIndex}
                        title={`${mod.link} (New tab)`}
                        onClick={function () {
                          window.open(mod.link)
                        }}
                      >
                        <span>Go to Mod</span>
                      </button>
                    </div>

                    <div className="shareButtonContainer">
                      <button
                        onClick={handleShareButtonClick}
                        className="shareButton"
                        title="Copy link to clipboard"
                        key={modIndex}
                      >
                        <span className="shareButtonText">Share</span>
                      </button>
                    </div>
                  </div>

                  {showModImages && (
                    <div className="gameTitle">
                      <a href={mod.gameHubLink}>
                        <img
                          className="gameImage"
                          title={mod.gameName}
                          src={mod.gameImage}
                          alt="Game the mod is from"
                        ></img>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )
        // ...
      })
  } else if (Object.keys(mods).length > 0) {
    // Use all mods if no filter is applied
    arrayModItems = Object.keys(sortedMods).map((modIndex) => {
      const mod = sortedMods[modIndex]
      // >> const difference = differences[modIndex]; // Use differences from state

      const subscriberDifference = subscribersDifferences[modIndex]
      const awardDifference = awardsDifferences[modIndex]
      const commentDifference = commentsDifferences[modIndex]
      const ratingDifference = ratingsDifferences[modIndex]
      const favoritesDifference = favoritesDifferences[modIndex]
      const uniqueVisitorsDifference = uniqueVisitorsCountDifferences[modIndex]
      const collectionsDifference = collectionsDifferences[modIndex]

      const handleShareButtonClick = (event) => {
        navigator.clipboard.writeText(mod.link)

        const buttonText = $(event.target).find('.shareButtonText')

        $(buttonText).fadeOut(300, function () {
          $(buttonText).html('Link Copied').fadeIn(300)
          setTimeout(() => {
            $(buttonText).fadeOut(400, function () {
              $(buttonText).html('Share').fadeIn(400)
            })
          }, 2300)
        })
      }

      return (
        <>
          <div className="mod" key={modIndex}>
            <div className="modImageContainer">
              <a name="ModImageLink" className="modImageLink" href={mod.link} target="_blank" rel="noreferrer">
                <span className="sr-only">Link to mod page</span>
                <img className="modImage" src={mod.image} alt="Mod preview" title={mod.name}></img>
              </a>
            </div>
            <h3 className="smallTitle">
              <a href={mod.link} title={mod.name} target="_blank" rel="noreferrer">
                {mod.name}
              </a>
            </h3>
            <div className={'flip3D'} flipped="false">
              <div className="back">
                <div className="closeButtonContainer">
                  <span className="closeButton" onClick={handleCloseButtonClick} title="Close extra mod statistics">
                    &#9747;
                  </span>
                </div>
                <table className="smallModStatistics">
                  <tbody>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faCloudArrowUp} className="faB cloudArrowUpB smallTableIcon backTable" />
                      </td>
                      <td className="smallTableLabel backTable">Uploaded</td>
                      <td className="smallTableValue backTable">{mod.uploadDate}</td>
                    </tr>

                    <tr>
                      <td>
                        <FontAwesomeIcon
                          icon={faSquareArrowUpRight}
                          className="faB squareArrowUpRightB smallTableIcon backTable"
                        />
                      </td>
                      <td className="smallTableLabel backTable">Updated</td>
                      <td className="smallTableValue backTable">{mod.updateDate}</td>
                    </tr>

                    <tr className="filesizeRow">
                      <td>
                        <FontAwesomeIcon icon={faFileLines} className="faB fileLinesB smallTableIcon backTable" />
                      </td>
                      <td className="smallTableLabel backTable">Filesize</td>
                      <td className="smallTableValue backTable">{mod.fileSize}</td>
                    </tr>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faFolderOpen} className="faB FolderOpenB smallTableIcon backTable" />
                      </td>
                      <td className="smallTableLabel backTable">Collections</td>
                      <td className="smallTableValue backTable">
                        {String(mod.collections).replace(/(.)(?=(\d{3})+$)/g, '$1,')}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="tagsContainer">
                  <div className="tagsRow">
                    {mod.workshopTags ? (
                      mod.workshopTags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag" title={tag}>
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span>No tags available.</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="front">
                <table className="smallModStatistics">
                  <tbody>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faEye} className="faM viewsIconM" />
                      </td>
                      <td className="smallTableLabel">Views</td>
                      <td className="smallTableValue">
                        {String(mod.uniqueVisitorsCount).replace(/(.)(?=(\d{3})+$)/g, '$1,')}
                      </td>
                      <td>
                        {uniqueVisitorsDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              uniqueVisitorsDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {uniqueVisitorsDifference > 0 ? '+' : ''}
                            {uniqueVisitorsDifference}
                          </span>
                        ) : (
                          <span className="invis">{uniqueVisitorsDifference ? '' : '+0'}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faUser} className="faM subsIconM" />
                      </td>
                      <td className="smallTableLabel">Subscribers</td>
                      <td className="smallTableValue">{String(mod.subscribers).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {subscriberDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              subscriberDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {subscriberDifference > 0 ? '+' : ''}
                            {subscriberDifference}
                          </span>
                        ) : (
                          <span className="invis">{subscriberDifference ? '' : '+0'}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faStar} className="faM AwardsIconM" />
                      </td>
                      <td className="smallTableLabel">Awards</td>
                      <td className="smallTableValue">{String(mod.awards).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {awardDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              awardDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {awardDifference > 0 ? '+' : ''}
                            {awardDifference}
                          </span>
                        ) : (
                          <span className="invis">{awardDifference ? '' : '+0'}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faComment} className="faM commentsIconM" />
                      </td>
                      <td className="smallTableLabel">Comments</td>
                      <td className="smallTableValue">{String(mod.comments).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {commentDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              commentDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {commentDifference > 0 ? '+' : ''}
                            {commentDifference}
                          </span>
                        ) : (
                          <span className="invis">{commentDifference ? '' : '+0'}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faHeart} className="faM favsIconM" />
                      </td>
                      <td className="smallTableLabel">Favorites</td>
                      <td className="smallTableValue">{String(mod.favorites).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {favoritesDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              favoritesDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {favoritesDifference > 0 ? '+' : ''}
                            {favoritesDifference}
                          </span>
                        ) : (
                          <span className="invis">{favoritesDifference ? '' : '+0'}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faChartSimple} className="faM ratingsIconM" />
                      </td>
                      <td className="smallTableLabel">Ratings</td>
                      <td className="smallTableValue">{String(mod.ratings).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {ratingDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              ratingDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {ratingDifference > 0 ? '+' : ''}
                            {ratingDifference}
                          </span>
                        ) : (
                          <span className="invis">{ratingDifference ? '' : '+0'}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="modstars" title="Mod rating">
                        <img src={mod.starsLink} alt="Mod stars rating"></img>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="buttonHolder">
                  <div className="statsButtonContainer">
                    <button
                      onClick={handleStatsButtonClick}
                      className="statsButton"
                      key={modIndex}
                      title="Show mod statistics"
                    >
                      <span>Stats</span>
                    </button>
                  </div>

                  <div className="modLinkButtonContainer">
                    <button
                      className="linkButton"
                      key={modIndex}
                      title={`${mod.link} (New tab)`}
                      onClick={function () {
                        window.open(mod.link)
                      }}
                    >
                      <span>Go to Mod</span>
                    </button>
                  </div>

                  <div className="shareButtonContainer">
                    <button
                      onClick={handleShareButtonClick}
                      className="shareButton"
                      title="Copy link to clipboard"
                      key={modIndex}
                    >
                      <span className="shareButtonText">Share</span>
                    </button>
                  </div>
                </div>

                {showModImages && (
                  <div className="gameTitle">
                    <a href={mod.gameHubLink}>
                      <img
                        className="gameImage"
                        title={mod.gameName}
                        src={mod.gameImage}
                        alt="Game the mod is from"
                      ></img>
                    </a>
                  </div>
                )}
              </div>
              <div className="frontInvis">
                <table className="smallModStatistics">
                  <tbody>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faEye} className="faM viewsIconM" />
                      </td>
                      <td className="smallTableLabel">Views</td>
                      <td className="smallTableValue">
                        {String(mod.uniqueVisitorsCount).replace(/(.)(?=(\d{3})+$)/g, '$1,')}
                      </td>
                      <td>
                        {uniqueVisitorsDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              uniqueVisitorsDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {uniqueVisitorsDifference > 0 ? '+' : ''}
                            {uniqueVisitorsDifference}
                          </span>
                        ) : (
                          <span className="invis">{uniqueVisitorsDifference ? '' : '+0'}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faUser} className="faM subsIconM" />
                      </td>
                      <td className="smallTableLabel">Subscribers</td>
                      <td className="smallTableValue">{String(mod.subscribers).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {subscriberDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              subscriberDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {subscriberDifference > 0 ? '+' : ''}
                            {subscriberDifference}
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faStar} className="faM AwardsIconM" />
                      </td>
                      <td className="smallTableLabel">Awards</td>
                      <td className="smallTableValue">{String(mod.awards).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {awardDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              awardDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {awardDifference > 0 ? '+' : ''}
                            {awardDifference}
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faComment} className="faM commentsIconM" />
                      </td>
                      <td className="smallTableLabel">Comments</td>
                      <td className="smallTableValue">{String(mod.comments).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {commentDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              commentDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {commentDifference > 0 ? '+' : ''}
                            {commentDifference}
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faHeart} className="faM favsIconM" />
                      </td>
                      <td className="smallTableLabel">Favorites</td>
                      <td className="smallTableValue">{String(mod.favorites).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {favoritesDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              favoritesDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {favoritesDifference > 0 ? '+' : ''}
                            {favoritesDifference}
                          </span>
                        ) : (
                          <span className="invis">{favoritesDifference ? '' : '+0'}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faChartSimple} className="faM ratingsIconM" />
                      </td>
                      <td className="smallTableLabel">Ratings</td>
                      <td className="smallTableValue">{String(mod.ratings).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {ratingDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              ratingDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {ratingDifference > 0 ? '+' : ''}
                            {ratingDifference}
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="modstars" title="Mod rating">
                        <img src={mod.starsLink} alt="Mod stars rating"></img>
                      </td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </table>

                <div className="buttonHolder">
                  <div className="statsButtonContainer">
                    <button
                      onClick={handleStatsButtonClick}
                      className="statsButton"
                      key={modIndex}
                      title="Show mod statistics"
                    >
                      <span>Stats</span>
                    </button>
                  </div>

                  <div className="modLinkButtonContainer">
                    <button
                      className="linkButton"
                      key={modIndex}
                      title={`${mod.link} (New tab)`}
                      onClick={function () {
                        window.open(mod.link)
                      }}
                    >
                      <span>Go to Mod</span>
                    </button>
                  </div>

                  <div className="shareButtonContainer">
                    <button
                      onClick={handleShareButtonClick}
                      className="shareButton"
                      title="Copy link to clipboard"
                      key={modIndex}
                    >
                      <span className="shareButtonText">Share</span>
                    </button>
                  </div>
                </div>

                {showModImages && (
                  <div className="gameTitle">
                    <a href={mod.gameHubLink}>
                      <img
                        className="gameImage"
                        title={mod.gameName}
                        src={mod.gameImage}
                        alt="Game the mod is from"
                      ></img>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )
    })
  }

  return (
    <>
      <div>
        {showMods && (
          <>
            {/* Use the SortButtons component and pass handleGameSelect */}
            <SortButtons
              mods={mods}
              sortBy={sortBy}
              sortOrder={sortOrder}
              handleSortButtonClick={handleSortButtonClick}
              setSelectedGame={setSelectedGame} // Pass the function
              selectedGame={selectedGame}
              showModImages={showModImages}
              setShowModImages={setShowModImages}
            />

            <div className="modContainer">{arrayModItems}</div>
          </>
        )}
      </div>
    </>
  )
}

export default ModContainer
