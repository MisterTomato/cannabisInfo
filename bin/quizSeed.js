const mongoose = require("mongoose");
const Quiz = require("../models/Quiz");
const data = require("./quizData");

mongoose
  .connect("mongodb://localhost/cannabis", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(connection => {
    console.log("Succesfully connected");
    return Quiz.deleteMany();
  })
  .then(() => {
    return Quiz.insertMany(data);
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch(err => {
    console.log(err + "Quiz seed");
  });
