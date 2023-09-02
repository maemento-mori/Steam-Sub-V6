import React, { useState, useEffect } from 'react' // Import useState

function SortButtons({ mods = {}, sortBy, sortOrder, handleSortButtonClick }) {
  const [showSortButtons, setShowSortButtons] = useState(false)

  useEffect(() => {
    setShowSortButtons(Object.keys(mods).length !== 0)
  }, [mods])

  // Define an array of sorting options
  const sortingOptions = [
    { key: 'subscribers', label: 'Subscribers' },
    { key: 'awards', label: 'Awards' },
    { key: 'comments', label: 'Comments' },
    { key: 'stars', label: 'Rating' },
    { key: 'gameName', label: 'Game' },
  ]

  return (
    <div className="sortButtonsContainer">
      {showSortButtons && (
        <div>
          <p>Sort : </p>
          {sortingOptions.map((option) => (
            <button
              key={option.key}
              className={`sortBy-${option.key} ${sortBy === option.key ? 'active' : ''}`}
              onClick={() => handleSortButtonClick(option.key)}
              title={`Sort by ${option.label}`}
            >
              {option.label}
              {sortBy === option.key ? (sortOrder === 'desc' ? ' (Desc)' : ' (Asc)') : ''}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SortButtons
