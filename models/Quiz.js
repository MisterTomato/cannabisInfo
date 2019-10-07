var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const quizSchema = new Schema({
  level: { type: Number, required: true },
  questions: [
    {
      q: { type: String, required: true },
      a: { type: String, required: true },
      key: { type: Number },
      tick: { type: Boolean, required: true },
      possible: [{ a: String, correct: { type: String, required: true } }]
    }
  ]
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
