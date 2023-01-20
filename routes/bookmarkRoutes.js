//* External Modules
const express = require('express');

//* Internal Modules
const bookmarkController = require('../controllers/bookmarkController');

//* Initialize Router
const router = express.Router();

//* Implement Middleware
// router.param('id', bookmarkController.checkID);

//* Handle Bookmark Routes
router
  .route('/')
  .get(bookmarkController.getAllBookmarks)
  .post(bookmarkController.addBookmark);
router
  .route('/:id')
  .get(bookmarkController.getBookmark)
  .patch(bookmarkController.updateBookmark)
  .delete(bookmarkController.deleteBookmark);

//* Export Router
module.exports = router;
