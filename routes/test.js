var express = require("express");
var router = express.Router();
const Article = require("../models/Articles");

router.get("/:level/:article", (req, res, next) => {
  const { level, article, test } = req.params;
  Article.findOne({ level: level, article: article })
    .then(article => {
      let nextLevel = parseInt(level) + 1;
      let currentArticle = article.article;
      let previousArticle = currentArticle > 1 ? currentArticle - 1 : null;
      let nextArticle =
        currentArticle < totalArtciles ? currentArticle + 1 : null;
      let finalArticle = currentArticle === totalArtciles ? true : null;

      res.render("test", {
        article: article,
        nextArticle: nextArticle,
        previouseArticle: previousArticle,
        finalArticle: finalArticle,
        nextLevel: nextLevel
      });
      debugger;
    })
    .catch(err => {
      console.log(err + " test router");
    });
});

module.exports = router;
