var express = require("express");
var router = express.Router();
const Quiz = require("../models/Quiz");

router.get("/:level/check", (req, res, next) => {
  debugger;
  const { level } = req.params;
  const key = Object.keys(req.query);
  const values = Object.values(req.query);
  const total = values.length;
  let count = 0;

  Quiz.findOne({ level: level })
    .then(quiz => {
      key.forEach((question, index) => {
        if (question = values[index]) {
            count++;
          }
        });
    }).then(check => {
        if (count / total >= 0.8) {
          res.redirect(`/plant/update/${level}`);
        } else if (count / total < 0.8) {
          req.session.message = "sorry you did not pass the test";
          res.render(`/test/${level}`)
        };
    }).catch(err => {
      console.log(err + "check route");
      req.session.message = "oeps someting went wrong" + err;
      res.redirect("/user");
    })
    debugger;
});

router.get("/:level", (req, res, next) => {
  const { level } = req.params;
  const message = req.session.message;
  Quiz.findOne({ level: level })
    .then(quiz => {
      console.log(quiz.questions);
      res.render("test", { quiz: quiz, message:message });
    })
    .catch(err => {
      console.log(err + "quiz route");
      req.session.message = "oeps someting went wrong" + err;
      res.redirect("/user");
    });
});

module.exports = router;
