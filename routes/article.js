var express = require("express");
var router = express.Router();
const Article = require("../models/Article");

router.get("/:level", (req, res, next) => {
  debugger;
  Article.findOne({ level: req.params.level })
    .then(article => {
      res.render("article", { article: article });
    })
    .catch(err => {
      console.log(err + "user.js route");
    });
});

module.exports = router;
