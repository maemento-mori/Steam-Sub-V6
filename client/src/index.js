import React, { useState } from 'react'; // Import useState
import ReactDOM from 'react-dom/client';

import './index.css';

import Form from './components/Form';
import ModContainer from './components/ModContainer';
import TotalTable from './components/TotalTable';
import Featured from './components/Featured';
import Profile from './components/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  // Create a functional component
  const [modList, setModList] = useState([{}]);
  const [userData, setUserData] = useState({});
  const [totalStats, setTotalStats] = useState({});
  const [profileData, setProfileData] = useState({});

  // ...

  return (
    <>
      <Form mods={setModList} userData={setUserData} totalStats={setTotalStats} profileData={setProfileData} />
      <div className="topContainer">
        <Profile userData={userData} profileData={profileData} />
        <Featured totals={totalStats} />
        <TotalTable totals={totalStats} userData={userData} />
      </div>
      <ModContainer mods={modList} />
    </>
  );
}

root.render(<App />); // Render the component
