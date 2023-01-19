//* External Modules
const express = require('express');
const morgan = require('morgan');

//* Internal Modules
const bookmarkRouter = require('./routes/bookmarkRoutes');
const userRouter = require('./routes/userRoutes');
const articleRouter = require('./routes/articleRoutes');

//* Initializing express
const app = express();

//* ======= Middeleware ======= //
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('========== Middleware Response ==========');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//* ======= Routes ======= //

app.use('/api/v1/bookmarks', bookmarkRouter);
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/users', userRouter);

//* Export App
module.exports = app;
