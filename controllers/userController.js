const User = require('../models/userModel');

//* User Handler Functions
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      staus: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Could not get users.',
    });
  }
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is under construction.',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is under construction.',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is under construction.',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is under construction.',
  });
};
