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
    });
});

router.get("/", (req, res, next) => {
  debugger;
  const user = req.session.passport.user;
  User.findById({ _id: user })
    .then(user => {
      Plant.findOne({ level: user.level })
        .then(plant => {
          res.render("plant", { plant: plant });
        })
        .catch(err => {
          console.log(err + "user.js route");
        });
    })
    .catch(err => {
      console.log(err + " plant route");
    });
});

router.get("/update/:level", (req, res, next) => {
  const { level } = req.params;
  console.log(req.session);
  debugger;
  User.findById({ _id: req.session.passport.user })
    .then(user => {
      user.level = level;
      user.save();
    })
    .then(() => {
      res.redirect("/plant");
    })
    .catch(err => {
      console.log(err + "plant update route");
    });
});

module.exports = router;
