import React, { useState, useEffect } from "react";
import "../styles/modContainer.css";
import $ from "jquery";

const ModContainer = ({ mods }) => {
  const [prevSubscribers, setPrevSubscribers] = useState({});
  const [differences, setDifferences] = useState({});
  const [fadeOut, setFadeOut] = useState(false);
  

  const updateSubscribersDifference = (modIndex, newSubscribers, modName) => {
    if (prevSubscribers[modIndex] !== undefined) {
      if (newSubscribers !== prevSubscribers[modIndex]) {
        // Calculate the difference when the subscribers change
        return newSubscribers - prevSubscribers[modIndex];
      }
    }
    return differences[modIndex] || 0;
  };

  useEffect(() => {
    const newSubscribers = {};
    const newDifferences = {}; // Create a new object to store differences

    Object.keys(mods).forEach((modIndex) => {
      newSubscribers[modIndex] = mods[modIndex].subscribers;
      newDifferences[modIndex] = updateSubscribersDifference(modIndex, mods[modIndex].subscribers);
    });

    setPrevSubscribers(newSubscribers);
    setDifferences(newDifferences); // Update differences only when subscribers change
  }, [mods]);

  useEffect(() => {
    // This useEffect will run when mods change
    // Calculate and update the differences when mods change
    const newDifferences = {};
    Object.keys(mods).forEach((modIndex) => {
      const mod = mods[modIndex];
      const difference = updateSubscribersDifference(modIndex, mod.subscribers, mod.name);
      newDifferences[modIndex] = difference;

      if (difference !== 0) {
        // Clear the difference and trigger fade-out animation after 3 seconds

        setTimeout(() => {
          setFadeOut(false); // Trigger fade out animation
        }, 100);

        setTimeout(() => {
          newDifferences[modIndex] = 0;
          // xx setDifferences({ ...newDifferences });
          setFadeOut(true); // Trigger fade out animation
        }, 4000);
      }
    });
    setDifferences(newDifferences);
  }, [mods, prevSubscribers]);

  const handleStatsButtonClick = (event) => {
    let ogHeight = $(".front").outerHeight();
    let newHeight = $(".back").outerHeight();

    let difference = newHeight - ogHeight;
    const closestMod = event.currentTarget.closest(".mod");
    const flipper = closestMod.querySelector(".flip3D");

    if (difference > 1) {
      flip(flipper, closestMod, difference);
    } else {
      flip(flipper, closestMod, 0);
    }
  };

  const flip = (el, closestModAvail, difference) => {
    if (el.getAttribute("flipped") === "true") {
      el.children[0].style.transform = "perspective(600px) rotateY(180deg)";
      el.children[1].style.transform = "perspective(600px) rotateY(0deg)";
      el.setAttribute("flipped", "false");
      $(closestModAvail).animate({ height: "-=" + difference });
    } else {
      el.children[0].style.transform = "perspective(600px) rotateY(0deg)";
      el.children[1].style.transform = "perspective(600px) rotateY(-180deg)";
      el.setAttribute("flipped", "true");
      $(closestModAvail).animate({ height: "+=" + difference });
    }
  };

  const flip2 = (el, closestModAvail, difference) => {
    if (el.getAttribute("flipped") === "true") {
      el.children[0].style.transform = "perspective(600px) rotateY(180deg)";
      el.children[1].style.transform = "perspective(600px) rotateY(0deg)";
      el.setAttribute("flipped", "false");
      $(closestModAvail).animate({ height: "-=" + difference });
    } else {
      el.children[0].style.transform = "perspective(600px) rotateY(0deg)";
      el.children[1].style.transform = "perspective(600px) rotateY(-180deg)";
      el.setAttribute("flipped", "true");
      $(closestModAvail).animate({ height: "+=" + difference });
    }
  };

  const handleCloseButtonClick = (event) => {
    let ogHeight = $(".front").outerHeight();
    let newHeight = $(".back").outerHeight();

    let difference = newHeight - ogHeight;
    const closestMod = event.currentTarget.closest(".mod");
    const flipper = closestMod.querySelector(".flip3D");
    if (difference > 1) {
      flip2(flipper, closestMod, difference);
    } else {
      flip2(flipper, closestMod, 0);
    }
  };

  let arrayModItems;

  if (Object.keys(mods).length > 0) {
    arrayModItems = Object.keys(mods).map((modIndex) => {
      const mod = mods[modIndex];
      const difference = differences[modIndex]; // Use differences from state
      return (
        <>
          <div className="mod" key={modIndex}>
            <div className="modImageContainer">
              <a name="ModImageLink" className="modImageLink" href={mod.link}>
                <span className="sr-only">Link to mod page</span>
                <img className="modImage" src={mod.image} alt="Mod preview"></img>
              </a>
            </div>
            <h3 className="smallTitle">
              <a href={mod.link}>{mod.name}</a>
            </h3>
            <div className={"flip3D"} flipped="false">
              <div className="back">
                <div className="closeButtonContainer">
                  <span className="closeButton" onClick={handleCloseButtonClick}>
                    X
                  </span>
                </div>
                <table className="smallModStatistics">
                  <tbody>
                    <tr>
                      <td className="smallTableLabel backTable">Uploaded</td>
                      <td className="smallTableValue backTable">
                        {mod.uploadDate}
                      </td>
                    </tr>

                    <tr>
                      <td className="smallTableLabel backTable">Updated</td>
                      <td className="smallTableValue backTable">
                        {mod.updateDate}
                      </td>
                    </tr>

                    <tr className="filesizeRow">
                      <td className="smallTableLabel backTable">Filesize</td>
                      <td className="smallTableValue backTable">
                        {mod.fileSize}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="tagsContainer">
                  <div className="tagsRow">
                    {mod.workshopTags ? (
                      mod.workshopTags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span>No tags available.</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="front">
                <table className="smallModStatistics">
                  <tbody>
                    <tr>
                      <td className="smallTableLabel">Subscribers</td>
                      <td className="smallTableValue">
                        {String(mod.subscribers).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                        {/* {console.log(prevSubscribers[modIndex])} */}
                      </td>
                      {prevSubscribers[modIndex] !== undefined && difference !== 0 ? (
  <div className={`subscriberDifference fade ${fadeOut ? "fade-out" : ""} ${difference > 0 ? 'increase' : difference < 0 ? 'decrease' : ''} `}>
  {`${difference > 0 ? '+' : ''}${difference}`}
</div>
) : null}
                    </tr>
                  <tr>
                    <td className="smallTableLabel">Awards</td>
                    <td className="smallTableValue">
                      {String(mod.awards).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                    </td>
                  </tr>
                  <tr>
                    <td className="smallTableLabel">Comments</td>
                    <td className="smallTableValue">
                      {String(mod.comments).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                    </td>
                  </tr>
                  <tr>
                    <td className="smallTableLabel">Ratings</td>
                    <td className="smallTableValue">
                      {String(mod.ratings).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="modstars">
                      <img src={mod.starsLink} alt="Mod stars rating"></img>
                    </td>
                  </tr>
                  <tr></tr>
                </tbody>
              </table>
              <div className="statsButtonContainer">
                  <button
                    onClick={handleStatsButtonClick}
                    className="statsButton"
                    key={modIndex}
                  >
                    More Stats
                  </button>
                </div>
              </div>
              <div className="frontInvis">
                <table className="smallModStatistics">
                  <tbody>
                  <tr>
                      <td className="smallTableLabel">Subscribers</td>
                      <td className="smallTableValue">
                        {String(mod.subscribers).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                        {/* {console.log(prevSubscribers[modIndex])} */}
                      </td>
                      {prevSubscribers[modIndex] !== undefined && difference !== 0 ? (
  <div className={`subscriberDifference ${difference > 0 ? 'increase' : difference < 0 ? 'decrease' : ''}`}>
  {`${difference > 0 ? '+' : ''}${difference}`}
</div>
) : null}
                    </tr>
                  <tr>
                    <td className="smallTableLabel">Awards</td>
                    <td className="smallTableValue">
                      {String(mod.awards).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                    </td>
                  </tr>
                  <tr>
                    <td className="smallTableLabel">Comments</td>
                    <td className="smallTableValue">
                      {String(mod.comments).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                    </td>
                  </tr>
                  <tr>
                    <td className="smallTableLabel">Ratings</td>
                    <td className="smallTableValue">
                      {String(mod.ratings).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="modstars">
                      <img src={mod.starsLink} alt="Mod stars rating"></img>
                    </td>
                  </tr>
                  <tr></tr>
                </tbody>
              </table>
              <button
                  onClick={handleStatsButtonClick}
                  className="statsButton"
                  key={modIndex}
                >
                  More Stats
                </button>
              </div>
            </div>
          </div>
        </>
      );
    });
  }
  return (
    <>
      <div>
        <div className="modContainer">{arrayModItems}</div>
      </div>
    </>
  );
};
export default ModContainer;
