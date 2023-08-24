import React, { useState } from "react"; // Import useState
import ReactDOM from "react-dom/client";

import "./index.css";

import Form from "./components/Form";
import ModContainer from "./components/ModContainer";
import TotalTable from "./components/TotalTable";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  // Create a functional component
  const [modList, setModList] = useState([{}]);
  const [userData, setUserData] = useState({});
  const [totalStats, setTotalStats] = useState({});

  // ...

  return (
    <>
      <Form
        mods={setModList}
        userData={setUserData}
        totalStats={setTotalStats}
      />
      <TotalTable totals={totalStats} userData={userData}/>
      <ModContainer mods={modList} />
    </>
  );
}

root.render(<App />); // Render the component
