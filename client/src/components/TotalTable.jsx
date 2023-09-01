import React, { useState, useEffect } from "react"; // Import useState
import "../styles/totalTable.css";
import starImage from "../images/star.png";

const TotalTable = ({ totals, userData }) => {
  const [showTotals, setShowTotals] = useState(false);
  const [prevTotal, setPrevTotal] = useState(null); // Keep track of previous total
  const [totalDifference, setTotalDifference] = useState(0); // Store the difference
  const [fadeOut, setFadeOut] = useState(false);

  function isReallyNaN(value) {
    return typeof value === "number" && isNaN(value);
  }

  useEffect(() => {
    // Update the visibility of totalsContainer based on the totals prop
    setShowTotals(totals.numMods !== null && totals.numMods !== undefined);

    if (prevTotal !== null && totals.total !== undefined) {
      const difference = totals.total - prevTotal;
      setTotalDifference(difference);

      setTimeout(() => {
        setFadeOut(false); // Trigger fade out animation
      }, 100); // 3000 milliseconds = 3 seconds

      setTimeout(() => {
        setFadeOut(true); // Reset fade out animation after 3 seconds
      }, 4000); // 3000 milliseconds = 3 seconds
    }
    setPrevTotal(totals.total);
  }, [totals]);

  return (
    <>
      <div className="totalsContainerOuter">
        {showTotals && ( // Conditionally render based on showTotals state
          <div className="totalsContainer">
            <table className="totalsTable">
              <tbody>
                <tr>
                  <th className="totalsHeader" colSpan={2}>
                    Total Stats
                  </th>
                </tr>
                <tr>
                  <th className="totalsUserName" colSpan={2}>
                    <a href={userData.profileUrl}>{userData.username}</a>
                  </th>
                </tr>
                <tr>
                  <td className="tableLabel">Mods Released</td>
                  <td className="tableValue">
                    {String(totals.numMods).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                  </td>
                </tr>
                <tr>
                  <td className="tableLabel">Downloads</td>
                  <td className="tableValue">
                    {String(totals.total).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                    {/* {console.log(totalDifference)} */}
                    {totalDifference !== 0 && !isReallyNaN(totalDifference) && (
                      <span
                        className={`fade ${fadeOut ? "fade-out" : ""} ${
                          totalDifference > 0 ? "increase" : "decrease"
                        }`}
                      >
                        {totalDifference > 0 ? "+" : ""}
                        {totalDifference}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="tableLabel">Awards</td>
                  <td className="tableValue">
                    {String(totals.awards).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                  </td>
                </tr>
                <tr>
                  <td className="tableLabel">Ratings</td>
                  <td className="tableValue">
                    {String(totals.ratings).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                  </td>
                </tr>
                <tr>
                  <td className="tableLabel">Avg Rating</td>
                  <td className="tableValue avgTd">
                    <span className="starAverage">{totals.avgStar}</span>
                    <img src={starImage} className="averageStarImage"></img>
                  </td>
                </tr>
                <tr>
                  <td className="tableLabel">Comments</td>
                  <td className="tableValue">
                    {String(totals.comments).replace(
                      /(.)(?=(\d{3})+$)/g,
                      "$1,"
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="tableLabel">Followers</td>
                  <td className="tableValue">
                    {String(userData.followers).replace(
                      /(.)(?=(\d{3})+$)/g,
                      "$1,"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default TotalTable;
