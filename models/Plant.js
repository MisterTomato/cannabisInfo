var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const plantSchema = new Schema({
  level: { type: Number, required: true },
  next: { type: String, required: true },
  image: { type: String, required: true }
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
