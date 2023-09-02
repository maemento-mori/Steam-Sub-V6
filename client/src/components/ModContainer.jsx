import React, { useState, useEffect } from 'react';
import '../styles/modContainer.css';
import $ from 'jquery';

const ModContainer = ({ mods }) => {
  // const [prevSubscribers, setPrevSubscribers] = useState({});
  const [differences, setDifferences] = useState({});
  const [showMods, setShowMods] = useState(false);

  const [prevSubscribers, setPrevSubscribers] = useState({});
  const [prevAwards, setPrevAwards] = useState({});
  const [prevComments, setPrevComments] = useState({});
  const [prevRatings, setPrevRatings] = useState({});

  const [subscribersDifferences, setSubscribersDifferences] = useState({});
  const [awardsDifferences, setAwardsDifferences] = useState({});
  const [commentsDifferences, setCommentsDifferences] = useState({});
  const [ratingsDifferences, setRatingsDifferences] = useState({});

  const [fade, setFade] = useState(false);

  const [sortOrder, setSortOrder] = useState('desc'); // State for sorting order
  const [sortBy, setSortBy] = useState('subscribers'); // State for sorting criteria

  const updateDifferences = (modIndex, newValue, oldValue, valueKey) => {
    if (oldValue !== undefined) {
      if (newValue !== oldValue) {
        // Calculate the difference when the value changes
        return newValue - oldValue;
      }
    }
    return valueKey ? differences[modIndex] || 0 : 0;
  };

  const updateSubscribersDifference = (modIndex, newSubscribers, modName) => {
    const oldValue = prevSubscribers[modIndex];
    return updateDifferences(modIndex, newSubscribers, oldValue, 'subscribers');
  };

  const updateAwardsDifference = (modIndex, newAwards, modName) => {
    const oldValue = prevAwards[modIndex];
    return updateDifferences(modIndex, newAwards, oldValue, 'awards');
  };

  const updateCommentsDifference = (modIndex, newComments, modName) => {
    const oldValue = prevComments[modIndex];
    return updateDifferences(modIndex, newComments, oldValue, 'comments');
  };

  const updateRatingsDifference = (modIndex, newRatings, modName) => {
    const oldValue = prevRatings[modIndex];
    return updateDifferences(modIndex, newRatings, oldValue, 'ratings');
  };

  useEffect(() => {
    const newSubscribers = {};
    const newAwards = {};
    const newComments = {};
    const newRatings = {};
    const newSubscribersDifferences = {};
    const newAwardsDifferences = {};
    const newCommentsDifferences = {};
    const newRatingsDifferences = {};

    setShowMods(Object.keys(mods).length > 1);

    Object.keys(mods).forEach((modIndex) => {
      newSubscribers[modIndex] = mods[modIndex].subscribers;
      newAwards[modIndex] = mods[modIndex].awards;
      newComments[modIndex] = mods[modIndex].comments;
      newRatings[modIndex] = mods[modIndex].ratings;

      newSubscribersDifferences[modIndex] = updateSubscribersDifference(modIndex, mods[modIndex].subscribers);
      newAwardsDifferences[modIndex] = updateAwardsDifference(modIndex, mods[modIndex].awards);
      newCommentsDifferences[modIndex] = updateCommentsDifference(modIndex, mods[modIndex].comments);
      newRatingsDifferences[modIndex] = updateRatingsDifference(modIndex, mods[modIndex].ratings);
    });

    setPrevSubscribers(newSubscribers);
    setPrevAwards(newAwards);
    setPrevComments(newComments);
    setPrevRatings(newRatings);

    setSubscribersDifferences(newSubscribersDifferences);
    setAwardsDifferences(newAwardsDifferences);
    setCommentsDifferences(newCommentsDifferences);
    setRatingsDifferences(newRatingsDifferences);

    setTimeout(() => {
      setFade(false);
    }, 100);

    setTimeout(() => {
      setFade(true);
    }, 4000);
  }, [mods]);

  const handleStatsButtonClick = (event) => {
    let ogHeight = $('.front').outerHeight();
    let newHeight = $('.back').outerHeight();

    let difference = newHeight - ogHeight;
    const closestMod = event.currentTarget.closest('.mod');
    const flipper = closestMod.querySelector('.flip3D');

    if (difference > 1) {
      flip(flipper, closestMod, difference);
    } else {
      flip(flipper, closestMod, -Math.abs(difference));
    }
  };

  const flip = (el, closestModAvail, difference) => {
    if (el.getAttribute('flipped') === 'true') {
      el.children[0].style.transform = 'perspective(600px) rotateY(180deg)';
      el.children[1].style.transform = 'perspective(600px) rotateY(0deg)';
      el.setAttribute('flipped', 'false');
      $(closestModAvail).animate({ height: '-=' + difference });
    } else {
      el.children[0].style.transform = 'perspective(600px) rotateY(0deg)';
      el.children[1].style.transform = 'perspective(600px) rotateY(-180deg)';
      el.setAttribute('flipped', 'true');
      $(closestModAvail).animate({ height: '+=' + difference });
    }
  };

  const flip2 = (el, closestModAvail, difference) => {
    if (el.getAttribute('flipped') === 'true') {
      el.children[0].style.transform = 'perspective(600px) rotateY(180deg)';
      el.children[1].style.transform = 'perspective(600px) rotateY(0deg)';
      el.setAttribute('flipped', 'false');
      $(closestModAvail).animate({ height: '-=' + difference });
    } else {
      el.children[0].style.transform = 'perspective(600px) rotateY(0deg)';
      el.children[1].style.transform = 'perspective(600px) rotateY(-180deg)';
      el.setAttribute('flipped', 'true');
      $(closestModAvail).animate({ height: '+=' + difference });
    }
  };

  const handleCloseButtonClick = (event) => {
    let ogHeight = $('.front').outerHeight();
    let newHeight = $('.back').outerHeight();

    let difference = newHeight - ogHeight;
    const closestMod = event.currentTarget.closest('.mod');
    const flipper = closestMod.querySelector('.flip3D');
    if (difference > 1) {
      flip2(flipper, closestMod, difference);
    } else {
      flip2(flipper, closestMod, -Math.abs(difference));
    }
  };

  // Function to sort mods based on the selected criteria
  const sortMods = (criteria) => {
    const modsArray = Object.values(mods);
    modsArray.sort((modA, modB) => {
      const valueA = modA[criteria];
      const valueB = modB[criteria];
      if (sortOrder === 'asc') {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
    return modsArray;
  };

  // Handle click on the sort button for different criteria
  const handleSortButtonClick = (criteria) => {
    // Toggle the sorting order if the same criteria is clicked again
    if (sortBy === criteria) {
      const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newSortOrder);
    } else {
      // Set the new sorting criteria and default to ascending order
      setSortBy(criteria);
      setSortOrder('desc');
    }
  };

  // Get the sorted mod items based on the selected criteria
  const sortedMods = sortMods(sortBy);

  let arrayModItems;

  if (Object.keys(mods).length > 0) {
    arrayModItems = Object.keys(sortedMods).map((modIndex) => {
      const mod = sortedMods[modIndex];
      // >> const difference = differences[modIndex]; // Use differences from state

      const subscriberDifference = subscribersDifferences[modIndex];
      const awardDifference = awardsDifferences[modIndex];
      const commentDifference = commentsDifferences[modIndex];
      const ratingDifference = ratingsDifferences[modIndex];

      const handleShareButtonClick = (event) => {
        let buttonText = $(event.target).closest('span');
        // $(buttonText).html('Copied Link')
        navigator.clipboard.writeText(mod.link);

        $('#shareButtonText').fadeOut(300, function () {
          $(this).html('Link Copied').fadeIn(300);
          setTimeout(() => {
            $('#shareButtonText').fadeOut(400, function () {
              $(this).html('Share').fadeIn(400);
            });
          }, 2300);
        });
      };

      return (
        <>
          <div className="mod" key={modIndex}>
            <div className="modImageContainer">
              <a name="ModImageLink" className="modImageLink" href={mod.link} target="_blank">
                <span className="sr-only">Link to mod page</span>
                <img className="modImage" src={mod.image} alt="Mod preview" title={mod.name}></img>
              </a>
            </div>
            <h3 className="smallTitle">
              <a href={mod.link} title={mod.name} target="_blank">
                {mod.name}
              </a>
            </h3>
            <div className={'flip3D'} flipped="false">
              <div className="back">
                <div className="closeButtonContainer">
                  <span className="closeButton" onClick={handleCloseButtonClick} title="Close extra mod statistics">
                    &#9747;
                  </span>
                </div>
                <table className="smallModStatistics">
                  <tbody>
                    <tr>
                      <td className="smallTableLabel backTable">Uploaded</td>
                      <td className="smallTableValue backTable">{mod.uploadDate}</td>
                    </tr>

                    <tr>
                      <td className="smallTableLabel backTable">Updated</td>
                      <td className="smallTableValue backTable">{mod.updateDate}</td>
                    </tr>

                    <tr className="filesizeRow">
                      <td className="smallTableLabel backTable">Filesize</td>
                      <td className="smallTableValue backTable">{mod.fileSize}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="tagsContainer">
                  <div className="tagsRow">
                    {mod.workshopTags ? (
                      mod.workshopTags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag" title={tag}>
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
                      <td className="smallTableValue">{String(mod.subscribers).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {subscriberDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              subscriberDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {subscriberDifference > 0 ? '+' : ''}
                            {subscriberDifference}
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="smallTableLabel">Awards</td>
                      <td className="smallTableValue">{String(mod.awards).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {awardDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              awardDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {awardDifference > 0 ? '+' : ''}
                            {awardDifference}
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="smallTableLabel">Comments</td>
                      <td className="smallTableValue">{String(mod.comments).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {commentDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              commentDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {commentDifference > 0 ? '+' : ''}
                            {commentDifference}
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="smallTableLabel">Ratings</td>
                      <td className="smallTableValue">{String(mod.ratings).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {ratingDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              ratingDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {ratingDifference > 0 ? '+' : ''}
                            {ratingDifference}
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="modstars" title="Mod rating">
                        <img src={mod.starsLink} alt="Mod stars rating"></img>
                      </td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </table>

                <div className="buttonHolder">
                  <div className="statsButtonContainer">
                    <button
                      onClick={handleStatsButtonClick}
                      className="statsButton"
                      key={modIndex}
                      title="Show mod statistics"
                    >
                      <span>Stats</span>
                    </button>
                  </div>

                  <div className="modLinkButtonContainer">
                    <button
                      className="linkButton"
                      key={modIndex}
                      title={`${mod.link} (New tab)`}
                      onClick={function () {
                        window.open(mod.link);
                      }}
                    >
                      <span>Go to Mod</span>
                    </button>
                  </div>

                  <div className="shareButtonContainer">
                    <button
                      onClick={handleShareButtonClick}
                      className="shareButton"
                      title="Copy link to clipboard"
                      key={modIndex}
                    >
                      <span id="shareButtonText">Share</span>
                    </button>
                  </div>
                </div>

                <div className="gameTitle">
                  <a href={mod.gameHubLink}>
                    <img
                      className="gameImage"
                      title={mod.gameName}
                      src={mod.gameImage}
                      alt="Game the mod is from"
                    ></img>
                  </a>
                </div>
              </div>
              <div className="frontInvis">
                <table className="smallModStatistics">
                  <tbody>
                    <tr>
                      <td className="smallTableLabel">Subscribers</td>
                      <td className="smallTableValue">{String(mod.subscribers).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {subscriberDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              subscriberDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {subscriberDifference > 0 ? '+' : ''}
                            {subscriberDifference}
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="smallTableLabel">Awards</td>
                      <td className="smallTableValue">{String(mod.awards).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {awardDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              awardDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {awardDifference > 0 ? '+' : ''}
                            {awardDifference}
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="smallTableLabel">Comments</td>
                      <td className="smallTableValue">{String(mod.comments).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {commentDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              commentDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {commentDifference > 0 ? '+' : ''}
                            {commentDifference}
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="smallTableLabel">Ratings</td>
                      <td className="smallTableValue">{String(mod.ratings).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</td>
                      <td>
                        {ratingDifference !== 0 ? (
                          <span
                            className={`fade ${fade ? 'fade-out' : ''} ${
                              ratingDifference > 0 ? 'increase' : 'decrease'
                            }`}
                          >
                            {ratingDifference > 0 ? '+' : ''}
                            {ratingDifference}
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="modstars" title="Mod rating">
                        <img src={mod.starsLink} alt="Mod stars rating"></img>
                      </td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </table>

                <div className="buttonHolder">
                  <div className="statsButtonContainer">
                    <button
                      onClick={handleStatsButtonClick}
                      className="statsButton"
                      key={modIndex}
                      title="Show mod statistics"
                    >
                      <span>Stats</span>
                    </button>
                  </div>

                  <div className="modLinkButtonContainer">
                    <button
                      className="linkButton"
                      key={modIndex}
                      title={`${mod.link} (New tab)`}
                      onClick={function () {
                        window.open(mod.link);
                      }}
                    >
                      <span>Go to Mod</span>
                    </button>
                  </div>

                  <div className="shareButtonContainer">
                    <button
                      onClick={handleShareButtonClick}
                      className="shareButton"
                      title="Copy link to clipboard"
                      key={modIndex}
                    >
                      <span id="shareButtonText">Share</span>
                    </button>
                  </div>
                </div>

                <div className="gameTitle">
                  <a href={mod.gameHubLink}>
                    <img
                      className="gameImage"
                      title={mod.gameName}
                      src={mod.gameImage}
                      alt="Game the mod is from"
                    ></img>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
  }

  let sortButtons;

  sortButtons = () => {
    return (
      <>
        <div className="sortButtonsContainer">
          <p>Sort : </p>
          <button
            className={`sortBy-subs ${sortBy === 'subscribers' ? 'active' : ''}`}
            onClick={() => handleSortButtonClick('subscribers')}
          >
            Subscribers
            {sortBy === 'subscribers' ? (sortOrder === 'desc' ? ' (Desc)' : ' (Asc)') : ''}
          </button>
          <button
            className={`sortBy-awards ${sortBy === 'awards' ? 'active' : ''}`}
            onClick={() => handleSortButtonClick('awards')}
          >
            Awards {sortBy === 'awards' ? (sortOrder === 'desc' ? ' (Desc)' : ' (Asc)') : ''}
          </button>
          <button
            className={`sortBy-comments ${sortBy === 'comments' ? 'active' : ''}`}
            onClick={() => handleSortButtonClick('comments')}
          >
            Comments {sortBy === 'comments' ? (sortOrder === 'desc' ? ' (Desc)' : ' (Asc)') : ''}
          </button>
          <button
            className={`sortBy-stars ${sortBy === 'stars' ? 'active' : ''}`}
            onClick={() => handleSortButtonClick('stars')}
          >
            Stars {sortBy === 'stars' ? (sortOrder === 'desc' ? ' (Desc)' : ' (Asc)') : ''}
          </button>
        </div>
      </>
    );
  };
  return (
    <>
      <div>
        {sortButtons()}
        {showMods && <div className="modContainer">{arrayModItems}</div>}
      </div>
    </>
  );
};
export default ModContainer;
