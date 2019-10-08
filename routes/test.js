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

  const checkingAnswers = (correct, anwers) => {
      correct.forEach((keys, index) => {
        if (keys == anwers[index]) {
          count++;
        }
      })
  checkScore();
  }

const checkScore = () => {
  debugger;
  if (count / total >= 0.74) {
      res.redirect(`/plant/update/${level}`);
  } else if (count / total < 0.74) {
      req.session.message = "sorry you did not pass the test";
      res.redirect(`/test/${level}`)
  } else {
    console.log(err + "check route");
    req.session.message = "oeps something whent wrong here";
    res.redirect("/user");
  }
  debugger;
}

checkingAnswers(key, values);
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
