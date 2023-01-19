const fs = require('fs');

const articles = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/articles.json`)
);
exports.getArticles = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: articles.articles.length,
    data: {
      articles,
    },
  });
};
