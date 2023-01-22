//* External Modules
const mongoose = require('mongoose');

//* Article Schema
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Articles need to have titles'],
    unique: true,
  },
  description: String,
  content: String,
  url: {
    type: String,
    required: [true, 'Aritlces need to have a URL'],
  },
  image: String,
  publishedAt: Date,
  source: Object,
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
