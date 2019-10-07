var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  description: [{ header: String, sub: String, content: String }],
  images: Array,
  requirements: Array,
  level: Number,
  article: { type: Number, required: true }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
