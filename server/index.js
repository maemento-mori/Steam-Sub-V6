// server/index.js



const express = require('express')
const app = express()

const cheerio = require("cheerio")
const axios = require("axios")

// const port = 3000
const PORT = process.env.PORT || 3001;

// Defining an Endpoint
app.get('/search/:name', async (req, res) => {
    const userNameID = req.params['name'];
    const userNameLink = `https://steamcommunity.com/id/${userNameID}/myworkshopfiles/?p=1&numperpage=30`;

  
  const modList = []
  const userData = []
  let totalStats = {}

  async function getProfileData() {
    console.log("Getting profile data...");
    const pageLinks = [];

    const axiosResponse = await axios.request({
      method: "GET",
      url: (userNameLink),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });
    const $ = cheerio.load(axiosResponse.data);

    $(".workshopBrowseItems")
      .find(".workshopItem .ugc")
      .each((index, element) => {
        let pageUrl = $(element).attr("href");
        //console.log("url:"+pageUrl)
        pageLinks.push(pageUrl);
        // console.log(pageUrl)
      });

    //console.log("length "+pageLinks.length)

    if (pageLinks.length == 30){

      let numPages = $(".workshopBrowsePagingInfo").text()
      // console.log(numPages)
      // numPages = numPages.replace("Showing 1-30 of","")
      // numPages = numPages.replace(/[^0-9]/g, "");
      const pageNumRegex = /^Showing (\d+)-(\d+) of (\d+) entries$/;
      const match = pageNumRegex.exec(numPages);
      // console.log(match)
      if (match) {
        const firstNumber = match[1];
        const secondNumber = match[2];
        const totalEntries = match[3];
        numPages = totalEntries / 30
        numPages = Math.ceil(numPages);
        // console.log("numpages "+numPages)
      
        // console.log("First Number:", firstNumber);
        // console.log("Second Number:", secondNumber);
        // console.log("Total Entries:", totalEntries); 
      } else {
        // console.log("No match found.");
      }
      
      let lastUrl = userNameLink
      let i = 0;

      do {
        i++;
        var regex = /p=\d+/;
        const found = lastUrl.match(regex)
        let foundNumber = String(found).replace(/[^0-9]/g, "");
        foundNumber = Number(foundNumber)
        // console.log(foundNumber)

        newPageNumber = foundNumber + 1;
        let newPageNumberString = "p=" + String(newPageNumber)
        newPageNumberString = lastUrl.replace(found,newPageNumberString)
        lastUrl = newPageNumberString
        // console.log("next page "+newPageNumberString)

        const axiosResponse = await axios.request({
          method: "GET",
          url: (newPageNumberString),
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
          },
        });
        const $ = cheerio.load(axiosResponse.data);

        $(".workshopBrowseItems")
        .find(".workshopItem .ugc")
        .each((index, element) => {
        let pageUrl = $(element).attr("href");
        //console.log("url:"+pageUrl)
        // console.log("test")
        // console.log("second Page" + pageUrl)
        pageLinks.push(pageUrl);
      });

      } while (i < (numPages-1));

      // console.log(pageLinks.length)
    }



    //console.log(JSON.stringify(pageLinks))
    let userData = {};
    const userName = $("#HeaderUserInfoName").text().replace(/[\t\n\r]/gm, '');
    const profileUrl = $("#HeaderUserInfoName").find("a").attr('href');
    const followerCount = $(".followStat").text().replace("\\", "");
    const workshopUrl = $(".HeaderUserInfoSection").find("a").attr('href');

    userData = {
      username: userName,
      profileUrl: profileUrl,
      followers: followerCount,
      workshopUrl: workshopUrl,
    };

    console.log(userData);

    // for (let i = 0; i < pageLinks.length; i++) {
    //   console.log(pageLinks[i]);
    // }
    //console.log("done")

    return {userData, pageLinks};
  }

  

  async function getIndividualMods(pageLinks) {
    console.log("Getting individual mods...");
    let i = 0;
    //console.log("pagelinks "+pageLinks)
    // for (let i = 0; i < pageLinks.length; i++) {
    //   console.log(pageLinks[i]);
    // }

    const totalSubs = [];
    const totalAwards = [];
    const totalRatings = [];
    const totalComments = [];
    const totalStars = [];

    while (i < pageLinks.length) {
      var newMod = {};

      const axiosResponse = await axios.request({
        method: "GET",
        url: pageLinks[i],
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        },
      });
      const $$ = cheerio.load(axiosResponse.data);

      var subCount = $$(".stats_table")
        .find("tr:nth-child(2)")
        .find("td:first-child")
        .text();
      
      var itemTitle = $$(".workshopItemTitle").text();
      let numRatings = $$(".numRatings").text();
      let itemUrl = pageLinks[i];
      numRatings = Number(numRatings.replace(/[^0-9]/g, ""));

      let numComments = $$(".commentthread_count_label").find("span").text();
      numComments = Number(numComments.replace(/[^0-9]/g, ""));

      let modAwards = 0;
      $$(".review_award").each((index, element) => {
        // scraping logic...
        let awards = $$(element).attr("data-reactioncount");
        modAwards += Number(awards);
        // // console.log(pageUrl)
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

      let workshopTags = [];

      $$(".workshopTags")
        .find("a")
        .each((index, element) => {
          // scraping logic...
          let workshopTag = $$(element).text();
          workshopTags.push(workshopTag);
        });

      let wsDescription = $$(".workshopItemDescription").html()

      totalComments.push(numComments);
      totalRatings.push(numRatings);
      totalAwards.push(modAwards);
      //console.log(subCount)
      subCount= Number(subCount.replace(/[^0-9]/g, ""));
      //subCount = subCount.replace(",", "");
      //console.log(pageLinks[i]);
      totalSubs.push(Number(subCount));

      //!! Creating new mod objects
      newMod = {
        name: itemTitle,
        subscribers: subCount,
        awards: modAwards,
        ratings: numRatings,
        stars: numStars,
        starsLink: numStarsLink,
        image: imageLink,
        comments: numComments,
        link: itemUrl,
        fileSize: fileSize,
        uploadDate: uploadDate,
        updateDate: updateDate,
        workshopTags: workshopTags,
        wsDescription: wsDescription,
      };
      modList.push(newMod);
      //console.log(newMod)
      i++;
    }
    // console.log(modList)

    let k = 0;
    let totalSubsNumber = 0;

    while (k < totalSubs.length) {
      //console.log(totalSubs[k])
      totalSubsNumber = totalSubsNumber + Number(totalSubs[k]);
      k++;
    }

    let z = 0;
    let totalAwardsNumber = 0;

    while (z < totalAwards.length) {
      totalAwardsNumber = totalAwardsNumber + Number(totalAwards[z]);
      z++;
    }

    let r = 0;
    let totalRatingsNumber = 0;

    while (r < totalRatings.length) {
      totalRatingsNumber = totalRatingsNumber + Number(totalRatings[r]);
      r++;
    }

    let q = 0;
    let totalCommentsNumber = 0;

    while (q < totalComments.length) {
      totalCommentsNumber = totalCommentsNumber + Number(totalComments[q]);
      q++;
    }

    let u = 0;
    let totalStarsNumber = 0;

    while (u < totalStars.length) {
      totalStarsNumber = totalStarsNumber + Number(totalStars[u]);
      u++;
    }
    let starAverage = Math.round(totalStarsNumber / totalStars.length);

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

    //console.log(modList)

    console.log("Mods released:     " + totalSubs.length);
    console.log(
      "Total subscribers: " +
        String(totalSubsNumber).replace(/(.)(?=(\d{3})+$)/g, "$1,")
    );
    console.log("Total Awards: " + String(totalAwardsNumber));
    console.log("Total Ratings: " + String(totalRatingsNumber));
    console.log("Average rating : " + String(starAverage));
    console.log("Total Comments: " + String(totalCommentsNumber));
    console.log("");

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
    };

    return totalStats
  }

  async function init() {
    const { userData, pageLinks } = await getProfileData();
    let totalStats = await getIndividualMods(pageLinks);
    let package = {userData, totalStats}
    console.log("Finished fetching data...");
    res.send(package);
    //console.log(userData)
    //console.log(totalStats)
    //console.log(modList)
  }

    init();

    
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})