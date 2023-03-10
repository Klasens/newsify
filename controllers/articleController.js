const Article = require('../models/articlesModel');

//* GNews Fetch URL
// https://gnews.io/api/v4/search?q=santos&token=1f0b1616e135b0f18fb4cb8923c548e8&lang=en&country=us&max=10

//*Psuedo Database
// const articles = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/articles.json`)
// );

//* Article Handler Functions
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: { articles: articles },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.addArticle = async (req, res) => {
  try {
    const newArticle = await Article.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        article: newArticle,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
