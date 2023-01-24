const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');

const signToken = (id) =>
  jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: req.body.passwordChangedAt,
      role: req.body.role,
    });
    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'missing UN or PW',
      });
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Bad Username or PW',
      });
      // return next(new AppError('Incorrect email and password!', 401));
    }
    // 3) If everything is ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Get token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in!',
      });
      // return next();
    }
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user for this token no longer exists',
      });
    }
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: 'fail',
        message: 'User recently changed password! Please log in again.',
      });
    }
    console.log('test');
    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid or expired token',
    });
  }
};

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  };

exports.forgotPassword = async (req, res, next) => {
  try {
    // 1) Get user using POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'There is no user with that email address.',
      });
    }
    // 2) Generate random rest token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
    try {
      console.log('Right before email send');
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message,
      });

      console.log('Right after email send');
      res.status(200).json({
        status: 'success',
        message: 'Token sent to user email',
      });
      next();
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        status: 'fail',
        message:
          'There was a problem sending the email, please try again later.',
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: 'Please provide a valid email',
    });
  }
};
exports.resetPassword = (req, res, next) => {};
