import React from 'react'

const SortButtons = ({ sortBy, sortOrder, handleSortButtonClick }) => {
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
        className={`sortBy-awards ${sortBy === 'awards' ? 'active' : ''}`}
        onClick={() => handleSortButtonClick('awards')}
        title="Sort by awards"
      >
        Awards {sortBy === 'awards' ? (sortOrder === 'desc' ? ' (Desc)' : ' (Asc)') : ''}
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
      <button
        onClick={() => handleSortButtonClick('gameName')}
        className={`sortBy-game ${sortBy === 'gameName' ? 'active' : ''}`}
        title="Sort by game"
      >
        Game
      </button>
    </div>
  )
}

export default SortButtons
