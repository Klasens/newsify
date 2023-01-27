const ArticleAPI = require('../models/articlesModelAPI');

//* GNews Fetch URL
// https://gnews.io/api/v4/search?q=santos&token=1f0b1616e135b0f18fb4cb8923c548e8&lang=en&country=us&max=10

//*Psuedo Database
// const articles = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/articles.json`)
// );
// exports.getArticlesRaw = async (req, res) => {
//   try {
//     const articles = await ArticleAPI.find();
//     res.status(200).json({
//       status: 'success',
//       requestedAt: req.requestTime,
//       data: { articles: articles[0].articles },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

//* Article Handler Functions
exports.getArticles = async (req, res) => {
  try {
    // const articles = await ArticleAPI.find({
    //   'articles.source.id': 'wired',
    // });
    const articles = await ArticleAPI.find();
    res.status(200).json({
      data: { articles },
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
    const newArticle = await ArticleAPI.create(req.body);
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
