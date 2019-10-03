const mongoose = require("mongoose");
const Article = require("../models/Articles");
const data = require("./articleData");

mongoose
  .connect("mongodb://localhost/cannabis", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(connection => {
    console.log("Succesfully connected");
    return Article.deleteMany();
  })
  .then(() => {
    return Article.insertMany(data);
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch(err => {
    console.log(err + "Article seed");
  });
