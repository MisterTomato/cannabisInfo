var express = require("express");
var router = express.Router();
const User = require("../models/Users");
const Article = require("../models/Articles");
const authorisationMiddleware = require("./authorisationMiddleware");

/* GET users listing. */

router.get("/reset", (req, res, next) => {
  User.findById({ _id: req.session.passport.user })
    .then(user => {
      user.level = 1;
      user.save();
    })
    .then(() => {
      res.redirect("/user");
    })
    .catch(err => {
      console.log(err + "reset route ");
      res.redirect("/auth/login");
    });
});

router.get("/", authorisationMiddleware(), (req, res, next) => {
  let openArticles = [];
  let closedArticles = [];
  let analytics;
  let keys = [0];
  let values = ["start"];

  User.findById({ _id: req.session.passport.user })
    .then(async user => {
      analytics = user.analytics;

      await analytics.forEach(index => {
        values.push(index.date);
        keys.push(index.count);
      });

      await Article.find({ level: { $lte: user.level } }).then(articles => {
        articles.forEach(key => {
          openArticles.push(key);
        });
      });

      await Article.find({ level: { $gt: user.level } }).then(articles => {
        articles.forEach(key => {
          closedArticles.push(key);
        });
      });

      return user;
    })
    .then(user => {
      const notBeginner = user.level != 1 ? true : null;
      const message = req.session.message;

      res.render("user/profile", {
        user: user,
        notBeginner: notBeginner,
        message: message,
        openArticles: openArticles,
        closedArticles: closedArticles,
        keys: encodeURI(JSON.stringify(keys)),
        values: encodeURI(JSON.stringify(values))
      });
      console.log("my data", openArticles);
    })
    .then(() => {
      req.session.message = null;
    })
    .catch(err => {
      console.log(err + "user.js route ");
      res.redirect("/auth/login");
    });
});

module.exports = router;
