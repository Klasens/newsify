const { login } = require('./authController');
const User = require('../models/userModel');

exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'Landing',
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};
exports.getSignUpForm = (req, res) => {
  res.status(200).render('signUp', {
    title: 'Sign up for an account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account',
  });
};
exports.getSearch = (req, res) => {
  res.status(200).render('search', {
    title: 'Search',
  });
};
exports.getConstruction = (req, res) => {
  res.status(200).render('construction', {
    title: 'Construction',
  });
};

exports.updateUserData = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).render('account', {
      title: 'Your account',
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};
