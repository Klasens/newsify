const fs = require('fs');
const express = require('express');

const app = express();

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the serverside!', app: 'Express' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const articles = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/articles.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});
app.get('/api/v1/articles', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: articles.articles.length,
    data: {
      articles,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
