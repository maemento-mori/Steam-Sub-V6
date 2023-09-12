import { useState, useEffect, useRef } from 'react'
import '../styles/sortButtons.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

const SortButtons = ({
  mods,
  sortBy,
  sortOrder,
  handleSortButtonClick,
  setSelectedGame,
  selectedGame,
  showModImages,
  setShowModImages,
}) => {
  const [dropdown, setDropdown] = useState(false)
  const [showGameButton, setShowGameButton] = useState(false)
  const [dropDownGear, setDropDownGear] = useState(false)
  const [showImages, setShowImages] = useState(true)
  const ref = useRef()
  let uniqueGameNames = new Set() // Use a Set to store unique game names

  if (Object.keys(mods).length > 0) {
    Object.keys(mods).forEach((modIndex) => {
      const mod = mods[modIndex]
      uniqueGameNames.add(mod.gameName)
    })
  }

  let arrayModItems = [...uniqueGameNames].map((gameName) => (
    <li
      gameName={gameName}
      key={gameName}
      onClick={() => {
        setSelectedGame(gameName)
        setDropdown(false)
      }}
    >
      {gameName}
    </li>
  ))

  arrayModItems.unshift(
    <li
      key="All"
      onClick={() => {
        setSelectedGame(null) // Pass null to show mods of all game names
        setDropdown(false) // Close the dropdown when "All" is clicked
      }}
    >
      All
    </li>
  )

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    if (arrayModItems.length > 2) {
      setShowGameButton(true)
    }
  }, [dropdown, arrayModItems])

  return (
    <div className="sortButtonsContainer">
      <p>Sort : </p>
      <button
        className={`sortBy-subs ${sortBy === 'subscribers' ? 'active' : ''}`}
        onClick={() => handleSortButtonClick('subscribers')}
        title="Sort by subscribers"
      >
        Subscribers
        {sortBy === 'subscribers' ? (sortOrder === 'desc' ? ' (Desc)' : ' (Asc)') : ''}
      </button>

      <button
        className={`sortBy-views ${sortBy === 'uniqueVisitorsCount' ? 'active' : ''}`}
        onClick={() => handleSortButtonClick('uniqueVisitorsCount')}
        title="Sort by Views"
      >
        Views
        {sortBy === 'uniqueVisitorsCount' ? (sortOrder === 'desc' ? ' (Desc)' : ' (Asc)') : ''}
      </button>

      <button
        className={`sortBy-awards ${sortBy === 'awards' ? 'active' : ''}`}
        onClick={() => handleSortButtonClick('awards')}
        title="Sort by awards"
      >
        Awards {sortBy === 'awards' ? (sortOrder === 'desc' ? ' (Desc)' : ' (Asc)') : ''}
      </button>

      <button
        className={`sortBy-favs ${sortBy === 'favorites' ? 'active' : ''}`}
        onClick={() => handleSortButtonClick('favorites')}
        title="Sort by Favorites"
      >
        Favorites
        {sortBy === 'favorites' ? (sortOrder === 'desc' ? ' (Desc)' : ' (Asc)') : ''}
      </button>

      <button
        className={`sortBy-comments ${sortBy === 'comments' ? 'active' : ''}`}
        onClick={() => handleSortButtonClick('comments')}
        title="Sort by comments"
      >
        Comments {sortBy === 'comments' ? (sortOrder === 'desc' ? ' (Desc)' : ' (Asc)') : ''}
      </button>
      <button
        className={`sortBy-ratings ${sortBy === 'stars' ? 'active' : ''}`}
        onClick={() => handleSortButtonClick('stars')}
        title="Sort by ratings"
      >
        Rating {sortBy === 'stars' ? (sortOrder === 'desc' ? ' (Desc)' : ' (Asc)') : ''}
      </button>

      {showGameButton && (
        <div className="gameButtonContainer">
          <ul ref={ref}>
            <li>
              <button
                onClick={() => {
                  handleSortButtonClick('gameName')
                }}
                className={`sortBy-game ${sortBy === 'gameName' ? 'active' : ''}`}
                title="Sort by game"
              >
                {selectedGame ? selectedGame : 'Game'}
              </button>
            </li>

            <li>
              <button onClick={() => setDropdown(!dropdown)} className={`dropDownButton ${dropdown ? 'active' : ''}`}>
                <span>&#8595;</span>
              </button>
              {dropdown && <ul className="gamesList">{arrayModItems}</ul>}
            </li>
          </ul>
        </div>
      )}
      <div className="settingsHolder">
        <button
          className={`settingsButton ${showModImages === true ? 'active' : ''}`}
          onClick={() => {
            setDropDownGear((prev) => !prev)
          }}
          title="Settings"
        >
          <FontAwesomeIcon icon={faGear} className="fa gearIcon" />
        </button>
        {dropDownGear && (
          <ul>
            <li
              onClick={() => {
                setShowImages((prev) => !prev)
                setShowModImages(!showModImages)
              }}
            >{`${showImages === true ? 'Hide Mod Images' : 'Show Mod Images'}`}</li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default SortButtons
