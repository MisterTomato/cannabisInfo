var express = require("express");
var router = express.Router();
const User = require("../models/Users");

/* GET users listing. */

router.get("/:id", (req, res, next) => {
  debugger;
  User.findById({ _id: req.params.id })
    .then(user => {
      debugger;
      res.render("user/profile", { user: user });
    })
    .catch(err => {
      console.log(err + "user.js route");
    });
});

module.exports = router;
