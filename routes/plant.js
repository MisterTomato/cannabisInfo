var express = require("express");
var router = express.Router();
const Plant = require("../models/Plant");
const User = require("../models/Users");

router.get("/:level", (req, res, next) => {
  Plant.findOne({ level: req.params.level })
    .then(plant => {
      res.render("plant", { plant: plant });
    })
    .catch(err => {
      console.log(err + "user.js route");
      res.redirect("/user");
    });
});

router.get("/", (req, res, next) => {
  const user = req.session.passport.user;
  const message = req.session.message;
  User.findById({ _id: user })
    .then(user => {
      Plant.findOne({ level: user.level })
        .then(plant => {
          res.render("plant", { plant: plant, message:message });
        }).then(() => {
          req.session.message = null;
        }).catch(err => {
          console.log(err + "user.js route");
        });
    })
    .catch(err => {
      console.log(err + " plant route");
      res.redirect("/user");
    });
});

router.get("/update/:level", (req, res, next) => {
  const { level } = req.params;
  console.log(req.session);
  User.findById({ _id: req.session.passport.user })
    .then(user => {
      user.level = (parseInt(level) + 1);
      user.save();
    })
    .then(() => {
      res.redirect("/plant");
    }).then(() => {
      req.session.message = null;
    }).catch(err => {
      console.log(err + "plant update route");
      res.redirect("/user");
    });
});

module.exports = router;
