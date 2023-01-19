const fs = require('fs');

const bookmarks = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/bookmarks.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Bookmark ID is: ${val}`);
  const id = req.params.id;
  // Query for bookmark ID
  const bookmark = bookmarks.find((el) => el.id === id);
  // Check if ID is valid
  if (!bookmark)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  next();
};

exports.checkBody = (req, res, next) => {
  console.log(`========== Checking the URL and Title ==========`);
  if (!req.body.title || !req.body.url)
    return res.status(400).json({
      status: 'fail',
      message: 'This article does not have a url or title',
    });
  next();
};

exports.getBookmark = (req, res) => {
  const id = req.params.id;
  // Query for bookmark ID
  const bookmark = bookmarks.find((el) => el.id === id);
  // Return bookmark
  res.status(200).json({
    status: 'successfully got bookmark',
    data: {
      bookmark,
    },
  });
};

exports.addBookmark = (req, res) => {
  let newId = '';
  for (i = 0; i < 10; ++i) newId += Math.floor(Math.random() * 10);
  const newBookmark = Object.assign({ id: newId }, req.body);
  bookmarks.push(newBookmark);
  fs.writeFile(
    `${__dirname}/../dev-data/data/bookmarks.json`,
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
  console.log(
    `---------- Successfully added bookmark with ID ${newBookmark.id} ----------`
  );
};

exports.updateBookmark = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      bookmark: '<updated bookmark here>',
    },
  });
};

exports.deleteBookmark = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
