//* External Modules
const express = require('express');

//* Internal Modules
const articleController = require('../controllers/articleController');

//* Initialize Router
const router = express.Router();

//* Handle Article Routes
router.route('/').get(articleController.getArticles);

//* Export Router
module.exports = router;
