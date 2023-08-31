// server/index.js

const express = require("express");
const app = express();

const cheerio = require("cheerio");
const axios = require("axios");

// const port = 3000
const PORT = process.env.PORT || 3001;

// Defining an Endpoint
app.get("/search/:name", async (req, res) => {
  const userNameID = req.params["name"];
  const userNameLink = `https://steamcommunity.com/id/${userNameID}/myworkshopfiles/?p=1&numperpage=30`;
  const userNameProfileLink = `https://steamcommunity.com/id/${userNameID}`;
  const start = Date.now();

  console.log(`>> Search Request : ${userNameID} <<`)
  console.log("[" + getTime(new Date()) + "]" + " : Initializing...");

  let totalStats = {};

  async function getUserData() {
    console.log("[" + getTime(new Date()) + "]" + " : Getting user page data...");

    const axiosResponse = await axios.request({
      method: "GET",
      url: userNameProfileLink
    });
    const $ = cheerio.load(axiosResponse.data);
    
    const userName = $(".actual_persona_name").text();
    const avatar = $(".playerAvatarAutoSizeInner img:nth-child(2)").attr('src');
    const avatarFrame = $(".playerAvatarAutoSizeInner img:nth-child(1)").attr('src');
    const playerLevel = $(".persona_level .friendPlayerLevelNum").text().slice(0, 2)
    // playerLevel = playerLevel.slice(0, 2);

    const playerLevelClasses = $(".persona_level .friendPlayerLevel").attr('class');
    const matches = playerLevelClasses.match(/lvl_\d+/);
    const  playerLevelClass = matches[0];

    const realName = $(".header_real_name ellipsis bdi").text()
    const profileDesc = $(".profile_summary").text()
    const favBadgeIcon = $(".favorite_badge_icon").find("img").attr('src');
    const favBadgeDesc = $(".favorite_badge_description")
    const favBadgeName = $(favBadgeDesc).find(".name").text()
    const favBadgeXP = $(favBadgeDesc).find(".xp").text()
    const onlineStatus = ( ($(".profile_in_game_header").text().indexOf("Offline") >= 0) ? "Offline" : "Online")
    // const favBadgeIcon = $(".favorite_badge_icon").find("img").attr('src');
    const hasProfileBG = $(".profile_page .has_profile_background");
    let profileBG = '';

    if (hasProfileBG.length) {
        const animatedBG = $(".profile_animated_background").find("video").attr('poster');
        if (animatedBG) {
            profileBG = animatedBG;
        } else {
            const matches = $(hasProfileBG).attr('style').match(/'([^']+)'/);
            if (matches && matches.length > 1) {
                profileBG = matches[1];
            }
        }
    }
  

    const userProfileData = {
      userName: userName,
      avatar: avatar,
      avatarFrame: avatarFrame,
      playerLevel: playerLevel,
      playerLevelClass: playerLevelClass,
      realName: realName,
      profileDesc: profileDesc,
      favBadgeIcon: favBadgeIcon,
      favBadgeName: favBadgeName,
      favBadgeXP: favBadgeXP,
      onlineStatus: onlineStatus,
      profileBG: profileBG

    }

    return userProfileData;
  }

  async function getProfileData() {
    console.log("[" + getTime(new Date()) + "]" + " : Getting profile data...");
    const pageLinks = [];

    const axiosResponse = await axios.request({
      method: "GET",
      url: userNameLink
    });
    const $ = cheerio.load(axiosResponse.data);

    $(".workshopBrowseItems")
      .find(".workshopItem .ugc")
      .each((index, element) => {
        let pageUrl = $(element).attr("href");
        pageLinks.push(pageUrl);
      });

    if (pageLinks.length == 30) {
      let numPages = $(".workshopBrowsePagingInfo").text();
      const pageNumRegex = /^Showing (\d+)-(\d+) of (\d+) entries$/;
      const match = pageNumRegex.exec(numPages);
      if (match) {
        const firstNumber = match[1];
        const secondNumber = match[2];
        const totalEntries = match[3];
        numPages = totalEntries / 30;
        numPages = Math.ceil(numPages);
      } else {
        // console.log("No match found.");
      }

      let lastUrl = userNameLink;
      let i = 0;

      do {
        i++;
        var regex = /p=\d+/;
        const found = lastUrl.match(regex);
        let foundNumber = String(found).replace(/[^0-9]/g, "");
        foundNumber = Number(foundNumber);

        newPageNumber = foundNumber + 1;
        let newPageNumberString = "p=" + String(newPageNumber);
        newPageNumberString = lastUrl.replace(found, newPageNumberString);
        lastUrl = newPageNumberString;

        const axiosResponse = await axios.request({
          method: "GET",
          url: newPageNumberString
        });
        const $ = cheerio.load(axiosResponse.data);

        $(".workshopBrowseItems")
          .find(".workshopItem .ugc")
          .each((index, element) => {
            let pageUrl = $(element).attr("href");
            pageLinks.push(pageUrl);
          });
      } while (i < numPages - 1);

    }

    let userData = {};
    const userName = $("#HeaderUserInfoName")
      .text()
      .replace(/[\t\n\r]/gm, "");
    const profileUrl = $("#HeaderUserInfoName").find("a").attr("href");
    const followerCount = $(".followStat").text().replace("\\", "");
    const workshopUrl = $(".HeaderUserInfoSection").find("a").attr("href");


    userData = {
      username: userName,
      profileUrl: profileUrl,
      followers: followerCount,
      workshopUrl: workshopUrl,
    };

    totalStats.followers = followerCount;

    return { userData, pageLinks };
  }

  async function getIndividualMods(pageLinks) {
    console.log(
      "[" + getTime(new Date()) + "]" + " : Getting individual mods..."
    );

    let totalStars =[]

    const promises = pageLinks.map(async (pageLink) => {
      const axiosResponse = await axios.request({
        method: "GET",
        url: pageLink
      });

      const $$ = cheerio.load(axiosResponse.data);

      const subCountText = $$(".stats_table tr:nth-child(2) td:first-child").text();
      const subCount = Number(subCountText.replace(/[^0-9]/g, ''));

      var itemTitle = $$(".workshopItemTitle").text();
      let numRatings = $$(".numRatings").text();
      let itemUrl = pageLink;
      numRatings = Number(numRatings.replace(/[^0-9]/g, ""));

      let numComments = $$(".commentthread_count_label").find("span").text();
      numComments = Number(numComments.replace(/[^0-9]/g, ""));

      let modAwards = 0;
      $$(".review_award").each((index, element) => {
        let awards = $$(element).attr("data-reactioncount");
        modAwards += Number(awards);
      });

      let imageLink = $$("#previewImageMain").attr("src");

      let numStars = $$(".fileRatingDetails").find("img").attr("src");
      let numStarsLink = numStars;

      if (numStars.indexOf("1-star") >= 0) {
        numStars = 1;
      } else if (numStars.indexOf("2-star") >= 0) {
        numStars = 2;
      } else if (numStars.indexOf("3-star") >= 0) {
        numStars = 3;
      } else if (numStars.indexOf("4-star") >= 0) {
        numStars = 4;
      } else if (numStars.indexOf("5-star") >= 0) {
        numStars = 5;
      } else numStars = 0;

      if (numStars > 1) {
        totalStars.push(numStars);
      }

      let fileSize = $$(".detailsStatsContainerRight")
        .find(".detailsStatRight:nth-child(1)")
        .html();
      let uploadDate = $$(".detailsStatsContainerRight")
        .find(".detailsStatRight:nth-child(2)")
        .html();
      uploadDate = uploadDate.split("@")[0];

      let updateDate = $$(".detailsStatsContainerRight")
        .find(".detailsStatRight:nth-child(3)")
        .html();
      updateDate = String(updateDate).split("@")[0];
      if (updateDate == "null") {
        updateDate = "Never";
      }

      let workshopTags = [];

      $$(".workshopTags")
        .find("a")
        .each((index, element) => {
          let workshopTag = $$(element).text();
          workshopTags.push(workshopTag);
        });

      return {
        itemTitle,
        subCount,
        modAwards,
        numRatings,
        numStars,
        numStarsLink,
        imageLink,
        numComments,
        itemUrl,
        fileSize,
        uploadDate,
        updateDate,
        workshopTags
      };
    });

    const modDataArray = await Promise.all(promises);

    const modList = modDataArray.map((modData) => {
      const newMod = {
        name: modData.itemTitle,
        subscribers: modData.subCount,
        awards: modData.modAwards,
        ratings: modData.numRatings,
        stars: modData.numStars,
        starsLink: modData.numStarsLink,
        image: modData.imageLink,
        comments: modData.numComments,
        link: modData.itemUrl,
        fileSize: modData.fileSize,
        uploadDate: modData.uploadDate,
        updateDate: modData.updateDate,
        workshopTags: modData.workshopTags
      };
      return newMod;
  });

    const calculateTotal = (arr) => arr.reduce((total, currentValue) => total + Number(currentValue), 0);

    const totalSubsNumber = calculateTotal(modDataArray.map(data => data.subCount));
    const totalAwardsNumber = calculateTotal(modDataArray.map(data => data.modAwards));
    const totalRatingsNumber = calculateTotal(modDataArray.map(data => data.numRatings));
    const totalCommentsNumber = calculateTotal(modDataArray.map(data => data.numComments));
    const totalStarsNumber = calculateTotal(totalStars);


    const starAverage = Math.round(totalStarsNumber / totalStars.length);

    modList.sort(function (a, b) {
      let x = Number(a.subscribers);
      let y = Number(b.subscribers);
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
      return 0;
    });

    let featuredMod = modList[0];
    //console.log(featuredMod)
    totalStats = {
      name: "Total Stats",
      total: totalSubsNumber,
      awards: totalAwardsNumber,
      ratings: totalRatingsNumber,
      comments: totalCommentsNumber,
      featured: featuredMod,
      avgStar: starAverage,
      numMods: modList.length,
    };
    console.log(`\n`)
    return { totalStats, modList };

  } // !! End getIndividualMods



  async function init() {
    const profileData =await getUserData();
    const { userData, pageLinks } = await getProfileData();
    let { totalStats, modList } = await getIndividualMods(pageLinks);
    let package = { userData, totalStats, modList, profileData };
    console.log(
      "[" + getTime(new Date()) + "]" + " : Finished fetching data..."
    );
    const millis = Date.now() - start;

    console.log(`>> Seconds elapsed : ${Math.floor(millis / 1000)} <<\n\n`);
    res.send(package);
    // >> console.log(userData)
    // >> console.log(totalStats)
    // >> console.log(modList)
  }

  init();
});

function getTime(today) {
  const hours = today.getHours().toString().padStart(2, '0');
  const minutes = today.getMinutes().toString().padStart(2, '0');
  const seconds = today.getSeconds().toString().padStart(2, '0');

  return hours + ':' + minutes + ':' + seconds;
}

function getDate(today) {
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to the month since it's zero-indexed
  const day = today.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

app.listen(PORT, () => {
  console.log(`[${getDate(new Date())} @ ${getTime(new Date())}] \nListening on port ${PORT}\n`);
  console.log(".................................\n\n")
});
