var express = require("express");
var router = express.Router();
const Article = require("../models/Articles");
const User = require("../models/Users");

router.get("/:level/:article/count", (req, res, next) => {
  const { level, article } = req.params;
  const date = new Date();
  const today = date.toISOString().slice(0, 10);
  const id = req.session.passport.user;

  User.find({ _id: id, "analytics.date": today })
    .then(user => {
      debugger;
      if (user[0].analytics) {
        debugger;
        return user[0].update(
          {
            $inc: {
              "analytics.$[element].count": 1
            }
          },
          { arrayFilters: [{ element: { date: today } }] }
        );
        debugger;
        // user[0].save();
      } else {
        return User.findById({ _id: id }).then(user => {
          debugger;
          user.analytics.push({ date: today, count: 1 });
          user.save();
          return;
        });
      }

      debugger;
    })
    .then(user => {
      debugger;
      res.redirect(`/article/${level}/${article}`);
    })
    .catch(err => {
      debugger;
    });
});

router.get("/:level/:article", (req, res, next) => {
  const id = req.session.passport.user;
  const { level, article } = req.params;
  let totalArtciles;

  Article.countDocuments({ level: level }, function(err, count) {
    if (err) {
      console.log(err + "count function");
    }
    totalArtciles = count;
  });

  Article.findOne({ level: level, article: article })
    .then(article => {
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
      res.redirect("/user");
    });
});

module.exports = router;
