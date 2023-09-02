import React, { useState } from 'react' // Import useState
import ReactDOM from 'react-dom/client'

import './index.css'

import Form from './components/Form'
import ModContainer from './components/ModContainer'
import TotalTable from './components/TotalTable'
import Featured from './components/Featured'
import Profile from './components/Profile'
import SortButtons from './components/SortButtons'

const root = ReactDOM.createRoot(document.getElementById('root'))

function App() {
  // Create a functional component
  const [modList, setModList] = useState([{}])
  const [userData, setUserData] = useState({})
  const [totalStats, setTotalStats] = useState({})
  const [profileData, setProfileData] = useState({})
  const [sortBy, setSortBy] = useState('subscribers') // Add sortBy state
  const [sortOrder, setSortOrder] = useState('desc') // Add sortOrder state

  const handleSortButtonClick = (criteria) => {
    // Toggle the sorting order if the same criteria is clicked again
    if (sortBy === criteria) {
      const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
      setSortOrder(newSortOrder)
    } else {
      // Set the new sorting criteria and default to descending order
      setSortBy(criteria)
      setSortOrder('desc')
    }
  }

  return (
    <>
      <Form mods={setModList} userData={setUserData} totalStats={setTotalStats} profileData={setProfileData} />
      <div className="topContainer">
        <Profile userData={userData} profileData={profileData} />
        <Featured totals={totalStats} />
        <TotalTable totals={totalStats} userData={userData} />
      </div>
      <SortButtons sortBy={sortBy} sortOrder={sortOrder} handleSortButtonClick={handleSortButtonClick} />
      <ModContainer mods={modList} sortBy={sortBy} sortOrder={sortOrder} />
    </>
  )
}

root.render(<App />) // Render the component
