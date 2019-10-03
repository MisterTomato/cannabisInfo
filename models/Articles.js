var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  description: [{header: String, title: String, content: String }],
  images: Array,
  requirements: Array,
  q: [{q: String, A: String}],
  level: { type: Number, required: true }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
