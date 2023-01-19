const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// Fetch URL
// https://gnews.io/api/v4/search?q=santos&token=1f0b1616e135b0f18fb4cb8923c548e8&lang=en&country=us&max=10

const articles = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/articles.json`)
);

const bookmarks = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/bookmarks.json`)
);

const getArticles = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: articles.articles.length,
    data: {
      articles,
    },
  });
};

const getBookmark = (req, res) => {
  const id = req.params.id;
  // Query for bookmark ID
  const bookmark = bookmarks.find((el) => el.id === id);
  // Check if ID is valid
  if (!bookmark)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  // Return bookmark
  res.status(200).json({
    status: 'successfully got bookmark',
    data: {
      bookmark,
    },
  });
};

const addBookmark = (req, res) => {
  let newId = '';
  for (i = 0; i < 10; ++i) newId += Math.floor(Math.random() * 10);
  const newBookmark = Object.assign({ id: newId }, req.body);
  bookmarks.push(newBookmark);
  fs.writeFile(
    `${__dirname}/dev-data/data/bookmarks.json`,
    JSON.stringify(bookmarks),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          bookmark: newBookmark,
        },
      });
    }
  );
};

const updateBookmark = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      bookmark: '<updated bookmark here>',
    },
  });
};

const deleteBookmark = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// app.get('/api/v1/articles', getArticles);
// app.get('/api/v1/bookmarks/:id', getBookmark);
// app.post('/api/v1/bookmarks', addBookmark);
// app.patch('/api/v1/bookmarks/:id', updateBookmark);
// app.delete('/api/v1/bookmarks/:id', deleteBookmark);

app.route('/api/v1/articles').get(getArticles);
app.route('/api/v1/bookmarks').post(addBookmark);
app
  .route('/api/v1/bookmarks/:id')
  .get(getBookmark)
  .patch(updateBookmark)
  .delete(deleteBookmark);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
