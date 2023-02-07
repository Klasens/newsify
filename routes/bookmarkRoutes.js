//* External Modules
const express = require('express');

//* Internal Modules
const bookmarkController = require('../controllers/bookmarkController');
const authController = require('../controllers/authController');

//* Initialize Router
const router = express.Router();

//* Implement Middleware
// router.param('id', bookmarkController.checkID);

//* Handle Bookmark Routes
router
  .route('/')
  .get(authController.protect, bookmarkController.getAllBookmarks)
  .post(authController.protect, bookmarkController.addBookmark);
router
  .route('/:id')
  .get(bookmarkController.getBookmark)
  .patch(bookmarkController.updateBookmark)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    bookmarkController.deleteBookmark
  );

//* Export Router
module.exports = router;
