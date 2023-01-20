const Bookmark = require('../models/bookmarkModel');

//* Bookmark Handler Functions
exports.getAllBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.status(200).json({
      status: 'success',
      results: bookmarks.length,
      data: { bookmarks },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    res.status(200).json({
      status: 'successfully got bookmark',
      data: {
        bookmark,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
};

exports.addBookmark = async (req, res) => {
  try {
    const newBookmark = await Bookmark.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        bookmark: newBookmark,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        bookmark,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    await Bookmark.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
};
