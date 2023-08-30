import React, { useState, useEffect } from "react"; // Import useState
import "../styles/featured.css";

const Featured = ({ totals }) => {
  const [showFeatured, setShowFeatured] = useState(false);

  useEffect(() => {
    // Update the visibility of totalsContainer based on the totals prop
    setShowFeatured(totals.featured !== undefined)
  }, [totals]);

  return (
    <>
    {showFeatured && (
        <div className="featuredModContainer">
          <div className="featureModInner">
            <div className="featureImageContainer">
              <img
                src={totals.featured?.image}
                alt="Featured mod"
                className="featuredModImage"
              ></img>
            </div>
            <div className="featuredStatsTableContainer">
              <table className="featuredTable">
                <tbody>
                <tr>
                  <th colSpan={2} className="featuredTableHead">{totals.featured?.name}</th>
                </tr>
                <tr>
                  <td className="featuredTableValue">
                    {totals.featured?.subscribers}
                  </td>
                  <td className="featuredTableLabel">
                    Downloads
                  </td>
                </tr>
                <tr>
                  <td className="featuredTableValue">
                    {totals.featured?.ratings}
                  </td>
                  <td className="featuredTableLabel">
                    Ratings
                  </td>
                </tr>
                <tr>
                  <td className="featuredTableValue">
                    {totals.featured?.awards}
                  </td>
                  <td className="featuredTableLabel">
                    Awards
                  </td>
                </tr>
                <tr>
                  <td className="featuredTableValue">
                    {totals.featured?.comments}
                  </td>
                  <td className="featuredTableLabel">
                    Comments
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="featuredStars">
                    <img src={totals.featured?.starsLink} alt="Featured mod number of stars" className="featuredStarsImage"></img>
                  </td>
                </tr>
                </tbody>
              </table>
              <table className="featuredTableBottom">
                <tbody>
              <tr>
              <td className="featuredTableMid">Size</td>
                  <td className="featuredTableMid">Upload</td>
                  <td className="featuredTableMid">Updated</td>
                </tr>
                <tr>
                <td className="featuredTableMid">{totals.featured?.fileSize}</td>
                  <td className="featuredTableMid">{totals.featured?.uploadDate}</td>
                  <td className="featuredTableMid">{totals.featured?.updateDate}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    )}
    </>
  );
};

export default Featured;
