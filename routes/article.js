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
      const currentArticle = article.article;
      const previousArticle = currentArticle > 1 ? currentArticle - 1 : null;
      const nextArticle =
        currentArticle < totalArtciles ? currentArticle + 1 : null;

      res.render("article", {
        article: article,
        nextArticle: nextArticle,
        previouseArticle: previousArticle
      });
    })
    .catch(err => {
      console.log(err + "user.js route");
    });
});

module.exports = router;
