import React, { useState, useEffect } from "react"; // Import useState
import "../styles/featured.css";

const Featured = ({ totals }) => {
  const [showFeatured, setShowFeatured] = useState(false);

  useEffect(() => {
    // Update the visibility of totalsContainer based on the totals prop
    setShowFeatured(totals.featured !== undefined);
  }, [totals]);

  return (
    <>
      {showFeatured && (
        <div className="featuredModContainer">
          <h2 className="featuredTitle">Featured Mod</h2>
          <div className="featureModInner">
            <div className="featuredLeft">
              <div className="featureImageContainer">
                <a href={totals.featured?.link}>
                  <img
                    src={totals.featured?.image}
                    alt="Featured mod"
                    className="featuredModImage"
                  ></img>
                </a>
              </div>
              <div className="featuredLinkHolder">
                <button 
                className="featuredLink"
                onClick={function () {
                  window.open(totals.featured.link)
                }}
                title={`Open ${totals.featured?.name}'s mod page on Steam`}
                >
                  See on steam
                </button>
              </div>
            </div>
            <div className="featuredStatsTableContainer">
              <table className="featuredTable">
                <tbody>
                  <tr>
                    <th colSpan={2} className="featuredTableHead">
                      <a href={totals.featured?.link}>
                        {totals.featured?.name}
                      </a>
                    </th>
                  </tr>
                  <tr>
                    <td className="featuredTableValue">
                      {String(totals.featured?.subscribers).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1,"
                      )}
                    </td>
                    <td className="featuredTableLabel">Downloads</td>
                  </tr>
                  <tr>
                    <td className="featuredTableValue">
                      {String(totals.featured?.ratings).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1,"
                      )}
                    </td>
                    <td className="featuredTableLabel">Ratings</td>
                  </tr>
                  <tr>
                    <td className="featuredTableValue">
                      {String(totals.featured?.awards).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1,"
                      )}
                    </td>
                    <td className="featuredTableLabel">Awards</td>
                  </tr>
                  <tr>
                    <td className="featuredTableValue">
                      {String(totals.featured?.comments).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1,"
                      )}
                    </td>
                    <td className="featuredTableLabel">Comments</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="featuredStars">
                      <img
                        src={totals.featured?.starsLink}
                        alt="Featured mod number of stars"
                        className="featuredStarsImage"
                      ></img>
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
                    <td className="featuredTableMid midValue">
                      {totals.featured?.fileSize}
                    </td>
                    <td className="featuredTableMid midValue">
                      {totals.featured?.uploadDate}
                    </td>
                    <td className="featuredTableMid midValue">
                      {totals.featured?.updateDate}
                    </td>
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
