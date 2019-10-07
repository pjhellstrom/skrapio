const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const express = require("express");
const router = express.Router();

router.get("/:selection", (req, res) => {
  const selection = req.params.selection;

  if (selection === "techcrunch") {
    const url = "https://techcrunch.com/";

    puppeteer
      .launch()
      .then(browser => browser.newPage())
      .then(page => {
        return page.goto(url).then(function() {
          return page.content();
        });
      })
      .then(html => {
        const $ = cheerio.load(html);
        const headlines = [];
        $("article.post-block").each(function() {
          headlines.push({
            title: $(this)
              .children("header")
              .children("h2")
              .children("a.post-block__title__link")
              .text(),
            body: $(this)
              .children("div.post-block__content")
              .children("p")
              .text(),
            link: $(this)
              .children("header")
              .children("h2")
              .children("a.post-block__title__link")
              .attr("href"),
            image: $(this)
              .children("footer")
              .children("figure")
              .children("picture")
              .children("source")
              .attr("srcset")
              .split(" ")[0],
            source: "TechCrunch"
          });
        });
        res.json(headlines);
      })
      .catch(console.error);
  } else if (selection === "macrumors") {
    const url = "https://www.macrumors.com";

    puppeteer
      .launch()
      .then(browser => browser.newPage())
      .then(page => {
        return page.goto(url).then(function() {
          return page.content();
        });
      })
      .then(html => {
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
              .substring(0, 100),
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
      })
      .catch(console.error);
  } else if (selection === "technewsworld") {
    const url = "https://www.technewsworld.com";

    puppeteer
      .launch()
      .then(browser => browser.newPage())
      .then(page => {
        return page.goto(url).then(function() {
          return page.content();
        });
      })
      .then(html => {
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
      })
      .catch(console.error);
  } else {
    return res.json({ msg: "This site can't be scraped at the moment." });
  }
});

module.exports = router;
