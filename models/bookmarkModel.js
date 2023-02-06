//* External Modules
const mongoose = require('mongoose');

//* Bookmark Schema
const bookmarkSchema = new mongoose.Schema(
  {
    userTitle: {
      type: String,
      default: '',
      trim: true,
    },
    userSummary: {
      type: String,
      default: '',
      trim: true,
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
    publishedAt: Date,
    sourceName: String,
    sourceURL: String,
    // user: {
    //   type: mongoose.Schema.objectId,
    //   ref: 'User',
    //   required: [true, 'Bookmarks need a user'],
    // },
  }
  // { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
