var express = require("express");
var router = express.Router();
const Plant = require("../models/Plant");

router.get("/:level", (req, res, next) => {
  debugger;
  Plant.findOne({ level: req.params.level })
    .then(plant => {
      res.render("plant", { plant: plant });
    })
    .catch(err => {
      console.log(err + "user.js route");
    });
});

module.exports = router;
