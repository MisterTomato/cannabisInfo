var express = require("express");
var router = express.Router();
const Article = require("../models/Articles");
const User = require("../models/Users");
var moment = require("moment");

router.get("/:level/:article/count", (req, res, next) => {
  const { level, article } = req.params;
  const date = new Date();
  const today = date.toISOString().slice(0, 10);
  const id = req.session.passport.user;
  console.log(today);

  User.findById({ _id: id })
    .then(user => {
     
      console.log(user);
      if (user.analytics.length === 0) {
        user.analytics.push({ date: today, count: 1 });
        user.save();
        return;
      } else {
        User.find({ _id: id, "analytics.date": today })
          .then(now => {
           
            if (now.length !== 0) {
          
              User.update(
                { "analytics.date": today },
                {
                  '$inc': {
                    "analytics.$.count": 1
                  }
                }
              )
                .then(updated => {
                  console.log("user is updates!!!<----" + updated);
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              User.findById({ _id: id }).then(user => {
                
                user.analytics.push({ date: today, count: 1 });
                user.save();
                return;
              });
            }
          })
          .then(user => {
            console.log(user);
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .then(user => {
      res.redirect(`/article/${level}/${article}`);
    })
    .catch(err => {
      console.log(err);
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
