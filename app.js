//* External Modules
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

//* Internal Modules
const bookmarkRouter = require('./routes/bookmarkRoutes');
const userRouter = require('./routes/userRoutes');
const articleRouter = require('./routes/articleRoutes');
const articleRouterAPI = require('./routes/articleRoutesAPI');

//* Initializing express
const app = express();

//* ======= GLOBAL Middeleware ======= //
//  Set Security Headers  //
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//  Limit # of Requests  //
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again later.',
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

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
app.use('/api/v1/articlesAPI', articleRouterAPI);
app.use('/api/v1/users', userRouter);

//* Export App
module.exports = app;
