var express = require("express");
var router = express.Router();
const User = require("../models/Users");

/* GET users listing. */

router.get("/", (req, res, next) => {
  User.findById({ _id: req.session.passport.user })
    .then(user => {
      res.render("user/profile", { user: user });
    })
    .catch(err => {
      console.log(err + "user.js route ");
    });
});

router.get("/:id", (req, res, next) => {
  User.findById({ _id: req.params.id })
    .then(user => {
      res.render("user/profile", { user: user });
    })
    .catch(err => {
      console.log(err + "user.js route id");
    });
});

module.exports = router;
