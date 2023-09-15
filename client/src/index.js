import React, { useState } from 'react' // Import useState
import ReactDOM from 'react-dom/client'

import './index.css'

import Form from './components/Form'
import ModContainer from './components/ModContainer'
import TotalTable from './components/TotalTable'
import Featured from './components/Featured'
import Profile from './components/Profile'

const root = ReactDOM.createRoot(document.getElementById('root'))

function App() {
  // Create a functional component
  const [modList, setModList] = useState([{}])
  const [userData, setUserData] = useState({})
  const [totalStats, setTotalStats] = useState({})
  const [profileData, setProfileData] = useState({})
  const [submit, setSubmit] = useState(false)
  // ...

  return (
    <>
      <Form
        mods={setModList}
        userData={setUserData}
        totalStats={setTotalStats}
        profileData={setProfileData}
        submit={setSubmit}
      />
      <div className="topContainer">
        <Profile userData={userData} profileData={profileData} />
        <div className="topStats">
          <Featured totals={totalStats} />
          <TotalTable totals={totalStats} userData={userData} />
        </div>
      </div>
      <ModContainer mods={modList} submit={submit} setSubmit={setSubmit} />
    </>
  )
}

root.render(<App />) // Render the component
