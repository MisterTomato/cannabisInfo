var express = require("express");
var router = express.Router();
const User = require("../models/Users");
const Article = require("../models/Articles");
const authorisationMiddleware = require("./authorisationMiddleware");

/* GET users listing. */

router.get("/reset", (req, res, next) => {
  debugger;
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
  let allArticles = []

  Article.find().then(articles => {
    articles.forEach(key => {
      allArticles.push(key);
    })
  }).then(() => {
    User.findById({ _id: req.session.passport.user })
    .then(user => {
      const notBeginner = user.level != 1 ? true : null;
      const message = req.session.message;
      res.render("user/profile", {
        user: user,
        notBeginner: notBeginner,
        message: message,
        articles: allArticles
      });
    })
    .then(() => {
      req.session.message = null;
    })
    .catch(err => {
      console.log(err + "user.js route ");
      res.redirect("/auth/login");
    })
  }).catch(err => {
    console.log(err + "article getting in user route")
  })

});

router.get("/:id", (req, res, next) => {
  User.findById({ _id: req.params.id })
    .then(user => {
      const notBeginner = user.level != 1 ? true : null;
      res.render("user/profile", { user: user, notBeginner: notBeginner });
    })
    .catch(err => {
      console.log(err + "user.js route id");
      res.redirect("/auth/login");
    });
});

module.exports = router;
