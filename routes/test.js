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

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  const start = async () => {
    await asyncForEach(key, async (question, index) => {
      if ((question = values[index])) {
        count++;
      }
    });
    if (count / total >= 0.8) {
      res.redirect(`/plant/update/${level}`);
    } else if (count / total < 0.8) {
      res.render(`/test/${level}`, {
        message: "sorry you did not pass the test"
      });
    }
  };

  start();
  debugger;
});

router.get("/:level", (req, res, next) => {
  const { level } = req.params;
  Quiz.findOne({ level: level })
    .then(quiz => {
      console.log(quiz.questions);
      res.render("test", { quiz: quiz });
    })
    .catch(err => {
      console.log(err + "quiz route");
      req.session.message = "oeps someting went wrong" + err;
      res.redirect("/user");
    });
});

module.exports = router;
