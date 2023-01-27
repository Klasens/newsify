const searchBtn = document.querySelector('.search__btn');

const getArticles = async function () {
  const data = await fetch(
    'https://gnews.io/api/v4/search?q=congress&token=1f0b1616e135b0f18fb4cb8923c548e8'
  );
  console.log(data);
};

searchBtn.addEventListener('click', function (e) {
  e.preventDefault();
  getArticles();
});
