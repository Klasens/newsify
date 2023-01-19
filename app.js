const express = require('express');
const morgan = require('morgan');

const bookmarkRouter = require('./routes/bookmarkRoutes');
const userRouter = require('./routes/userRoutes');
const articleRouter = require('./routes/articleRoutes');

const app = express();

// ------- Middeleware ------- //
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('========== Middleware Response ==========');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//* GNews Fetch URL
// https://gnews.io/api/v4/search?q=santos&token=1f0b1616e135b0f18fb4cb8923c548e8&lang=en&country=us&max=10

// ------- Pseudo Databases ------- //

// ------- Route Handlers ------- //

// app.get('/api/v1/articles', getArticles);
// app.get('/api/v1/bookmarks/:id', getBookmark);
// app.post('/api/v1/bookmarks', addBookmark);
// app.patch('/api/v1/bookmarks/:id', updateBookmark);
// app.delete('/api/v1/bookmarks/:id', deleteBookmark);

// ------- Routes ------- //

app.use('/api/v1/bookmarks', bookmarkRouter);
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
