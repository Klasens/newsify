//* External Modules
const express = require('express');

//* Internal Modules
const articleControllerAPI = require('../controllers/articleControllerAPI');

//* Initialize Router
const router = express.Router();

//* Handle Article Routes
router
  .route('/')
  .get(articleControllerAPI.getArticles)
  .post(articleControllerAPI.addArticle);

//* Export Router
module.exports = router;
