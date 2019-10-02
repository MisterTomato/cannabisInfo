var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: Array,
  level: { type: Number, required: true }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
