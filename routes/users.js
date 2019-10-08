var express = require("express");
var router = express.Router();
const User = require("../models/Users");

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

router.get("/", (req, res, next) => {
  User.findById({ _id: req.session.passport.user }).then(user => {
      const notBeginner = user.level != 1 ? true : null;
      const message = req.session.message;
      res.render("user/profile", {
        user: user,
        notBeginner: notBeginner,
        message: message
      });
    }).catch(err => {
      console.log(err + "user.js route ");
      res.redirect("/auth/login");
    });
});

router.get("/:id", (req, res, next) => {
  User.findById({ _id: req.params.id })
    .then(user => {
      const notBeginner = user.level != 1 ? true : null;
      res.render("user/profile", { user: user, notBeginner: notBeginner });
    }).catch(err => {
      console.log(err + "user.js route id");
      res.redirect("/auth/login");
    });
});

module.exports = router;
