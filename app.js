//* External Modules
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

//* Internal Modules
const bookmarkRouter = require('./routes/bookmarkRoutes');
const userRouter = require('./routes/userRoutes');
const articleRouter = require('./routes/articleRoutes');
const articleRouterAPI = require('./routes/articleRoutesAPI');
const viewRouter = require('./routes/viewRoutes');

//* Initializing express
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//* ======= GLOBAL Middeleware ======= //
app.use(express.static(path.join(__dirname, 'public')));
//  Set Security Headers  //
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

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
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('========== Middleware Response ==========');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

//* ======= Routes ======= //
app.use('/', viewRouter);
app.use('/api/v1/bookmarks', bookmarkRouter);
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/articlesAPI', articleRouterAPI);
app.use('/api/v1/users', userRouter);

//* Export App
module.exports = app;
