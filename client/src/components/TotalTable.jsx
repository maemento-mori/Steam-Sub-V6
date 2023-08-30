import React, { useState, useEffect } from "react"; // Import useState
import "../styles/totalTable.css";
import starImage from "../images/star.png"

const TotalTable = ({totals, userData}) => {

  const [showTotals, setShowTotals] = useState(false);
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    // Update the visibility of totalsContainer based on the totals prop
    setShowTotals(totals.numMods !== null && totals.numMods !== undefined);
  }, [totals]);

  return (
    <>
      <div className="totalsContainerOuter">
      {showTotals && ( // Conditionally render based on showTotals state
        <div className="totalsContainer" >
          <table className="totalsTable">
            <tbody>
              <tr>
                <th className="totalsHeader" colSpan={2}>Total Stats</th>
              </tr>
              <tr>
                <th className="totalsUserName" colSpan={2}>{userData.username}</th>
                
              </tr>
              <tr>
                <td className="tableLabel">Mods Released</td>
                <td className="tableValue">{String(totals.numMods).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1,"
                      )}</td>
              </tr>
              <tr>
                <td className="tableLabel">Downloads</td>
                <td className="tableValue">{String(totals.total).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1,"
                      )}</td>
              </tr>
              <tr>
                <td className="tableLabel">Awards</td>
                <td className="tableValue">{String(totals.awards).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1,"
                      )}</td>
              </tr>
              <tr>
                <td className="tableLabel">Ratings</td>
                <td className="tableValue">{String(totals.ratings).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1,"
                      )}</td>
              </tr>
              <tr>
                <td className="tableLabel">Avg Rating</td>
                <td className="tableValue">
                  <span className="starAverage">{totals.avgStar}</span>
                  <img src={starImage} className="averageStarImage"></img>
                  </td>
              </tr>
              <tr>
                <td className="tableLabel">Comments</td>
                <td className="tableValue">{String(totals.comments).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1,"
                      )}</td>
              </tr>
              <tr>
                <td className="tableLabel">Followers</td>
                <td className="tableValue">{String(userData.followers).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1,"
                      )}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      </div>
    </>
  );

}

export default TotalTable;