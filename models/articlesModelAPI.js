//* External Modules
const mongoose = require('mongoose');

const articleAPISchema = new mongoose.Schema({
  status: String,
  totalResults: Number,
  articles: Object,
});

const ArticleAPI = mongoose.model('ArticleAPI', articleAPISchema);

module.exports = ArticleAPI;
