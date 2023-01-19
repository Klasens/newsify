const express = require('express');
const bookmarkController = require('./../controllers/bookmarkController');

const router = express.Router();

router.param('id', bookmarkController.checkID);

router
  .route('/')
  .post(bookmarkController.checkBody, bookmarkController.addBookmark);
router
  .route('/:id')
  .get(bookmarkController.getBookmark)
  .patch(bookmarkController.updateBookmark)
  .delete(bookmarkController.deleteBookmark);

module.exports = router;
