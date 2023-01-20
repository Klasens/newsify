//* External Modules
const mongoose = require('mongoose');

//* Bookmark Schema
const bookmarkSchema = new mongoose.Schema({
  userTitle: {
    type: String,
    default: '',
  },
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
  publishedAt: String,
  source: Object,
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
