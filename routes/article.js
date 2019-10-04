var express = require("express");
var router = express.Router();
const Article = require("../models/Articles");

router.get("/:level/:article", (req, res, next) => {
  const { level, article } = req.params;
  let totalArtciles;
  debugger;

  Article.countDocuments({ level: level }, function(err, count) {
    if (err) {
      console.log(err + "count function");
    }
    totalArtciles = count;
  });

  Article.findOne({ level: level, article: article })
    .then(article => {
      debugger;
      let nextLevel = parseInt(level) + 1;
      let currentArticle = article.article;
      let previousArticle = currentArticle > 1 ? currentArticle - 1 : null;
      let nextArticle =
        currentArticle < totalArtciles ? currentArticle + 1 : null;
      let finalArticle = currentArticle === totalArtciles ? true : null;

      res.render("article", {
        article: article,
        nextArticle: nextArticle,
        previouseArticle: previousArticle,
        finalArticle: finalArticle,
        nextLevel: nextLevel
      });
    })
    .catch(err => {
      console.log(err + "user.js route");
    });
});

module.exports = router;
