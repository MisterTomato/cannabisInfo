const mongoose = require("mongoose");
const Plant = require("../models/Plant");
const data = require("./plantData");

mongoose
  .connect("mongodb://localhost/cannabis", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(connection => {
    console.log("Succesfully connected");
    return Plant.deleteMany();
  })
  .then(() => {
    return Plant.insertMany(data);
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch(err => {
    console.log(err + "Plant seed");
  });
