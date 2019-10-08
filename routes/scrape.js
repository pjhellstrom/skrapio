const cheerio = require("cheerio");
const request = require("request");
const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/:selection", (req, res) => {
  const selection = req.params.selection;

  if (selection === "techcrunch") {
    const url = "https://techcrunch.com/";

    axios
      .get(url)
      .then(function(response) {
        const $ = cheerio.load(response.data);
        const headlines = [];
        $("a.post-block__title__link").each((i, element) => {
          headlines.push({
            title: $(element)
              .text()
              .trim(),
            body: $(element)
              .parents()
              .children("div.post-block__content")
              .text()
              .replace(/\n/, "")
              .replace(/\t\t/, "")
              .replace(/\t/, "")
              .concat("..."),
            link: $(element)
              .parents()
              .children("a.post-block__title__link")
              .attr("href"),
            image: $(element)
              .parents()
              .children(
                "footer.post-block__footer > figure:nth-child(1) > picture:nth-child(1) > source:nth-child(1)"
              )
              .attr("srcset"),
            source: "TechCrunch"
          });
        });
        res.json(headlines);
      })
      .catch(console.error);
    // const scrapeSite = async url => {
    //   try {
    //     const response = await axios.get(url);
    //     const $ = cheerio.load(response.data);
    //     console.log("$: ", $);
    //     const headlines = [];
    //     $("article.post-block").each(function() {
    //       headlines.push({
    //         title: $(this)
    //           .children("header")
    //           .children("h2")
    //           .children("a.post-block__title__link")
    //           .text(),
    //         body: $(this)
    //           .children("div.post-block__content")
    //           .children("p")
    //           .text(),
    //         link: $(this)
    //           .children("header")
    //           .children("h2")
    //           .children("a.post-block__title__link")
    //           .attr("href"),
    //         image: $(this)
    //           .children("footer")
    //           .children("figure")
    //           .children("picture")
    //           .children("source")
    //           .attr("srcset")
    //           .split(" ")[0],
    //         source: "TechCrunch"
    //       });
    //     });
    //     res.json(headlines);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // scrapeSite(url);

    // request(url, async (error, response, html) => {
    //   if (!error && response.statusCode == 200) {
    //     const $ = await cheerio.load(html);
    //     const headlines = [];
    //     $("article.post-block").each(function() {
    //       console.log("this: ", this);
    //       headlines.push({
    //         title: $(this)
    //           .children("header")
    //           .children("h2")
    //           .children("a.post-block__title__link")
    //           .text(),
    //         body: $(this)
    //           .children("div.post-block__content")
    //           .children("p")
    //           .text(),
    //         link: $(this)
    //           .children("header")
    //           .children("h2")
    //           .children("a.post-block__title__link")
    //           .attr("href"),
    //         image: $(this)
    //           .children("footer")
    //           .children("figure")
    //           .children("picture")
    //           .children("source")
    //           .attr("srcset")
    //           .split(" ")[0],
    //         source: "TechCrunch"
    //       });
    //     });
    //     // res.json(headlines);
    //   }
    // });
  } else if (selection === "macrumors") {
    const url = "https://www.macrumors.com";

    request(url, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const headlines = [];
        $("div.article").each(function() {
          headlines.push({
            title: $(this)
              .children("h2")
              .children("a")
              .text(),
            body: $(this)
              .children("div.content")
              .children("div.content_inner")
              .text()
              .substring(0, 250)
              .concat("..."),
            link: $(this)
              .children("h2")
              .children("a")
              .attr("href"),
            image: $(this)
              .children("div.content")
              .children("div.content_inner")
              .children("img")
              .attr("src"),
            source: "MacRumors"
          });
        });
        res.json(headlines);
      }
    });
  } else if (selection === "technewsworld") {
    const url = "https://www.technewsworld.com";

    request(url, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const headlines = [];
        $("div.story-list").each(function() {
          headlines.push({
            title: $(this)
              .children("div.title")
              .text(),
            body: $(this)
              .children("div.teaser")
              .text(),
            link: $(this)
              .children("span.story-link")
              .children("a")
              .attr("href"),
            image: $(this)
              .children("div.image")
              .children("a")
              .children("img")
              .attr("src"),
            source: "TechNewsWorld"
          });
        });
        res.json(headlines);
      }
    });
  } else if (selection === "engadget") {
    const url = "https://www.engadget.com/tag/blog/";

    request(url, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const headlines = [];
        $("article.o-hit").each(function() {
          headlines.push({
            title: $(this)
              .children("div.title")
              .text(),
            body: $(this)
              .children("div.teaser")
              .text(),
            link: $(this)
              .children("span.story-link")
              .children("a")
              .attr("href"),
            image: $(this)
              .children("div.image")
              .children("a")
              .children("img")
              .attr("src"),
            source: "TechNewsWorld"
          });
        });
        res.json(headlines);
      }
    });
  } else {
    return res.json({ msg: "This site can't be scraped at the moment." });
  }
});

module.exports = router;
