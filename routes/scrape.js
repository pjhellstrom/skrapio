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
              .split(" ")[0]
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
