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
const cors = require('cors');

//* Internal Modules
const bookmarkRouter = require('./routes/bookmarkRoutes');
const userRouter = require('./routes/userRoutes');
const articleRouter = require('./routes/articleRoutes');
const articleRouterAPI = require('./routes/articleRoutesAPI');
const viewRouter = require('./routes/viewRoutes');

//* Initializing express
const app = express();
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
//   methods: 'GET, POST',
// };
app.use(cors());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//* ======= GLOBAL Middeleware ======= //
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, OPTIONS'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, OPTIONS'
//   );
//   next();
// });

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
app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  })
);
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
