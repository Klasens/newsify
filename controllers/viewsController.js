const { login } = require('./authController');

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
