import React from "react";
import "../styles/modContainer.css";
import $ from "jquery";

const ModContainer = ({ mods }) => {
  const handleStatsButtonClick = (event) => {
    let ogHeight = $(".front").outerHeight();
    let newHeight = $(".back").outerHeight();

    let difference = newHeight - ogHeight;
    if (difference > 1) {
      const closestMod = event.currentTarget.closest(".mod");
      const flipper = closestMod.querySelector(".flip3D");
      flip(flipper, closestMod, difference);
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
    }
  };

  const handleCloseButtonClick = (event) => {
    let ogHeight = $(".front").outerHeight();
    let newHeight = $(".back").outerHeight();

    let difference = newHeight - ogHeight;
    if (difference > 1) {
      const closestMod = event.currentTarget.closest(".mod");
      const flipper = closestMod.querySelector(".flip3D");
      flip2(flipper, closestMod, difference);
    }
  };

  let arrayModItems;

  if (mods.length > 1) {
    arrayModItems = mods.map((mod, index) => (
      <>
        <div className="mod" key={index}>
          <div className="modImageContainer">
            <a className="modImageLink"></a>
            <img className="modImage" src={mod.image}></img>
            <button className="statsButton" onClick={handleStatsButtonClick}>
              Stats
            </button>
          </div>
          <h3 className="smallTitle">{mod.name}</h3>
          <div className={"flip3D"}>
            <div className="back">
              <span className="closeButton" onClick={handleCloseButtonClick}>
                X
              </span>
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

                  <tr className="tagsRow" colSpan={2}>
                    <td className="tags" colSpan={2}>
                      {mod.workshopTags ? (
                        mod.workshopTags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="tag">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span>No tags available.</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="front">
              <table className="smallModStatistics">
                <tbody>
                  <tr>
                    <td className="smallTableLabel">Subs</td>
                    <td className="smallTableValue">
                      {String(mod.subscribers).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1,"
                      )}
                    </td>
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
                      <img src={mod.starsLink}></img>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="frontInvis">
              <table className="smallModStatistics">
                <tbody>
                  <tr>
                    <td className="smallTableLabel">Subs</td>
                    <td className="smallTableValue">
                      {String(mod.subscribers).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1,"
                      )}
                    </td>
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
                      <img src={mod.starsLink}></img>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    ));
  } else {
    arrayModItems = <li>No mods available.</li>;
  }

  return (
    <>
      <div>
        <ul className="modContainer">{arrayModItems}</ul>
      </div>
    </>
  );
};
export default ModContainer;
