const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const express = require("express");
const router = express.Router();

router.get("/:selection", (req, res) => {
  if (req.params.selection === "techcrunch") {
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
        const newsHeadlines = [];
        $("article.post-block").each(function() {
          console.log(this.children);
          newsHeadlines.push({
            title: $(this).text(),
            image: ""
          });
        });

        res.json(newsHeadlines);
      })
      .catch(console.error);
  } else {
    res.json({ msg: "That site can't be scraped at the moment" });
  }
});

module.exports = router;
