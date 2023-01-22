//* External Modules
const express = require('express');

//* Internal Modules
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//* Initialize Router
const router = express.Router();

router.post('/signup', authController.signup);

//* Handle User Routes
router
  .route('/')
  .get(userController.getAllUsers) //Calls the imported controller then the imported function
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

//* Export Router
module.exports = router;
