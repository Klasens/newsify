const express = require('express');
const articleController = require('./../controllers/articleController');

const router = express.Router();

router.route('/').get(articleController.getArticles);

module.exports = router;
