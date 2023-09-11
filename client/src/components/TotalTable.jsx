import React, { useState, useEffect } from 'react'
import '../styles/totalTable.css'
import starImage from '../images/star.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faStar} from '@fortawesome/free-solid-svg-icons'
import { faEye} from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen} from '@fortawesome/free-solid-svg-icons'
import { faChartSimple} from '@fortawesome/free-solid-svg-icons'
import { faComments} from '@fortawesome/free-solid-svg-icons'


// !! Define the TotalTable component
const TotalTable = function ({ totals, userData }) {
  // Define state variables using the useState hook
  const [showTotals, setShowTotals] = useState(false)
  const [fade, setFade] = useState(false)

  // () Custom hook for tracking differences in values
  const useDifferenceState = (initialValue, source = 'totals') => {
    // Initialize state variables for previous value and difference
    const [prevValue, setPrevValue] = useState(null)
    const [difference, setDifference] = useState(initialValue)

    // () useEffect hook to handle changes in values and differences
    useEffect(() => {
      // Check if there's a previous value to calculate the difference
      if (prevValue !== null) {
        let newDifference = 0

        // # Determine the source of the value (totals or userData)
        if (source === 'userData') {
          newDifference = userData[initialValue] - prevValue
        } else {
          newDifference = totals[initialValue] - prevValue
        }

        // Update the difference state
        setDifference(newDifference)

        // Set a timeout to control the fade effect
        setTimeout(() => {
          setFade(false)
        }, 100)

        setTimeout(() => {
          setFade(true)
        }, 4000)
      }

      // # Set the previous value based on the source
      if (source === 'userData') {
        setPrevValue(userData[initialValue])
      } else {
        setPrevValue(totals[initialValue])
      }
    }, [totals, userData, source])

    // () Return the current difference and previous value
    return [difference]
  }

  // () Use the custom hook to track differences for various statistics
  const [totalDifferenceMods, prevTotalMods] = useDifferenceState('numMods')
  const [totalDifference, prevTotal] = useDifferenceState('total')
  const [totalDifferenceAwards, prevTotalAwards] = useDifferenceState('awards')
  const [totalDifferenceRatings, prevTotalRatings] = useDifferenceState('ratings')
  const [totalDifferenceComments, prevTotalComments] = useDifferenceState('comments')
  const [totalDifferenceFollowers, prevTotalFollowers] = useDifferenceState('followers', 'userData')
  const [totalDifferenceFavorites, prevTotalFavorites] = useDifferenceState('favorites')
  const [totalDifferenceUniqueVisitors, prevTotalUniqueVisitors] = useDifferenceState('uniqueVisitors')
  const [totalDifferenceCollections, prevTotalCollections] = useDifferenceState('favorites')

  // () useEffect hook to update the visibility of the totalsContainer
  useEffect(() => {
    setShowTotals(totals.numMods !== null && totals.numMods !== undefined)
  }, [totals])

  // () Helper function to render table rows
  const renderTableRow = (label, value, differenceValue,icon) => {
    console.log()
    return (
      <tr>
        <td>
          {icon}
        </td>
        <td className="tableLabel">{label}</td>
        <td className="tableValue">{String(value).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
        <td>
          {differenceValue !== 0 && !isReallyNaN(differenceValue) && (
            <span className={`fade ${fade ? 'fade-out' : ''} ${differenceValue > 0 ? 'increase' : 'decrease'}`}>
              {differenceValue > 0 ? '+' : ''}
              {differenceValue}
            </span>
          )}
          <span className="invis">{differenceValue ? '' : '+0'}</span>
        </td>
      </tr>
    )
  }

  // () Helper function to check if a value is really NaN
  const isReallyNaN = (value) => typeof value === 'number' && isNaN(value)

  // () Render the component's UI
  return (
    <div className="totalsContainerOuter">
      {showTotals && (
        <div className="totalsContainer">
          <table className="totalsTable">
            <tbody>
              <tr>
                <th className="totalsHeader" colSpan={4}>
                  Total Stats
                </th>
              </tr>
              <tr>
                <th className="totalsUserName" colSpan={4}>
                  <a href={userData.profileUrl}>{userData.username}</a>
                </th>
              </tr>
              {/* Render rows for different statistics */}
              {renderTableRow('Mods Released', totals.numMods, totalDifferenceMods,<FontAwesomeIcon icon={faArrowUp} className='fa modsUploadedIcon'/>)}
              {renderTableRow('Visitors', totals.uniqueVisitors, totalDifferenceUniqueVisitors,<FontAwesomeIcon icon={faEye} className='fa viewsIcon'/>)}
              {renderTableRow('Subscribers', totals.total, totalDifference,<FontAwesomeIcon icon={faUser} className='fa subsIcon'/>)}
              {renderTableRow('Awards', totals.awards, totalDifferenceAwards,<FontAwesomeIcon icon={faStar} className='fa awardsIcon'/>)}
              {renderTableRow('Favorites', totals.favorites, totalDifferenceFavorites,<FontAwesomeIcon icon={faHeart} className='fa favsIcon'/>)}
              {renderTableRow('Collections', totals.collections, totalDifferenceCollections,<FontAwesomeIcon icon={faFolderOpen} className='fa collectionsIcon'/>)}
              {renderTableRow('Ratings', totals.ratings, totalDifferenceRatings,<FontAwesomeIcon icon={faStar} className='fa ratingsIcon'/>)}
              <tr>
                <td>
                <FontAwesomeIcon icon={faChartSimple} className='fa ratingsIcon'/>
                </td>
                <td className="tableLabel">Avg Rating</td>
                <td className="tableValue avgTd">
                  <span className="starAverage">{totals.avgStar}</span>
                  <img src={starImage} className="averageStarImage" alt="Star" />
                </td>
              </tr>
              {renderTableRow('Comments', totals.comments, totalDifferenceComments,<FontAwesomeIcon icon={faComments} className='fa commentsIcon'/>)}
              {renderTableRow('Followers', userData.followers, totalDifferenceFollowers,<FontAwesomeIcon icon={faUser} className='fa subsIcon'/>)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default TotalTable
