/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { signUp } from './signUp';
import { updateSettings } from './updateSettings';
import { createBookmark } from './bookmark';

// TOP HEADLINES SELECTORS
const generalHeadlines = document.getElementById('general');
const worldHeadlines = document.getElementById('world');
const nationHeadlines = document.getElementById('nation');
const businessHeadlines = document.getElementById('business');
const technologyHeadlines = document.getElementById('technology');
const entertainmentHeadlines = document.getElementById('entertainment');
const sportsHeadlines = document.getElementById('sports');
const scienceHeadlines = document.getElementById('science');
const healthHeadlines = document.getElementById('health');

const signUpForm = document.querySelector('.form--signUp');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('#logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const searchBtn = document.querySelector('.btn__header--search');
const articleContainer = document.querySelector('.articles');
// const resultsContainer = document.querySelector('.results__list');
const resultsTotal = document.querySelector('.results');
const inputField = document.querySelector('#query');

if (signUpForm)
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInpt = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const pwInput = document.getElementById('password');
    const pwConfirmInput = document.getElementById('passwordConfirm');
    const name = nameInpt.value;
    const email = emailInput.value;
    const password = pwInput.value;
    const passwordConfirm = pwConfirmInput.value;
    signUp(name, email, password, passwordConfirm);
  });
if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const pwInput = document.getElementById('password');
    const email = emailInput.value;
    const password = pwInput.value;
    login(email, password);
  });

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);
    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('btnPassword').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.getElementById('btnPassword').textContent = 'Save Password';
  });

if (searchBtn)
  searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const query = inputField.value;
    getArticles(query);
  });

const state = { articlesArray: [], totalArticles: '' };

const createBookmarkSelector = function (article) {
  const bookmarkBtn = document.querySelector('#bookmarkBtn');
  bookmarkBtn.addEventListener('click', function () {
    console.log('test');
    const title = article.title;
    const description = article.description;
    const content = article.content;
    const url = article.url;
    const image = article.image;
    const publishedAt = article.publishedAt;
    const sourceName = article.sourceName;
    const sourceURL = article.sourceURL;
    createBookmark(
      title,
      description,
      content,
      url,
      image,
      publishedAt,
      sourceName,
      sourceURL
    );
  });
};

const displayArticle = function () {
  const id = window.location.hash.slice(1);
  console.log(id);

  let article = state.articlesArray[id];
  article = {
    title: article.title,
    description: article.description,
    content: article.content,
    url: article.url,
    image: article.image,
    publishedAt: article.publishedAt,
    sourceURL: article.source.url,
    sourceName: article.source.name,
  };
  const html = `
    <figure class="articles__img"><img class="img--article" crossorigin="anonymous" src="https://newsify.herokuapp.com/${article.image}" alt="${article.title}"/>
    <div class="articles__title"><span>${article.title} 
    </figure>
        <div id="bookmarkBtn" class="articles__bookmark"><img class="img--bookmark" src="img/bookmark.png" alt="Logo"/><span class="articles__entry">Bookmark Article</span></div>
        <div class="articles__description">
          <h5 class="articles__subHead">Article Description</h5>
          <p class="articles__text">${article.description} </p>
        </div>
        <div class="articles__source">
          <h5 class="articles__subHead">Source Information</h5>
          <div class="articles__entry--container">
            <div class="articles__entry--miniContainer"><img class="img--sourceInfo" src="img/checkmark.png" alt="Logo"/><span class="articles__entry">${article.sourceName}</span></div>
            <div class="articles__entry--miniContainer"><img class="img--sourceInfo" src="img/checkmark.png" alt="Logo"/><span class="articles__entry">${article.sourceURL}</span></div>
            <div class="articles__entry--miniContainer miniHeader"><img class="img--sourceInfo" src="img/checkmark.png" alt="Logo"/><span class="articles__entry">${article.publishedAt}</span></div>
          </div>
        </div>
        <div class="articles__content"> 
          <h5 class="articles__subHead">Article Content</h5>
          <p class="articles__text">${article.content}</p>
          <a href="${article.url}"> 
            <button class="btn btn__header btn__header--green">Go To Site &#8594;  </button></a>
        </div></span></div>
    `;
  articleContainer.innerHTML = '';
  articleContainer.insertAdjacentHTML('afterbegin', html);
  createBookmarkSelector(article);
};

const getArticles = async function (query) {
  try {
    const res = await fetch(
      `https://gnews.io/api/v4/search?q=${query}&token=897bf7a2f1c3629008e07a83dd527b10`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}(${res.status})`);
    state.articlesArray = data.articles;
    state.totalArticles = data.totalArticles;
    ['hashchange', 'load'].forEach((ev) =>
      window.addEventListener(ev, displayArticle)
    );
    const markupTotal = function () {
      let total = state.totalArticles;
      let html = `
      <div class="results__total">Total Articles Found - ${total}</div>
      `;
      resultsTotal.innerHTML = '';
      resultsTotal.insertAdjacentHTML('afterbegin', html);
    };
    console.log('Html inserted');

    const markupPreview = function (result, index) {
      return `
      <a href="#${index}">
        <li class="results__list-item"><img class="results__img" crossorigin="anonymous" src="https://newsify.herokuapp.com/${result.image}" alt="${result.title}"/>
          <div class="results__list-item--container">
            <h4 class="results__title">${result.title}</h4>
            <span class="results__source">${result.source.name}</span>
          </div>
        </li>
      </a>
      `;
    };
    console.log(' Second Html generated');
    resultsTotal.innerHTML = '';
    console.log(' Container cleared');
    markupTotal();
    resultsTotal.insertAdjacentHTML(
      'beforeend',
      state.articlesArray.map(markupPreview).join('')
    );
    console.log(' Second Html inserted');
  } catch (err) {
    console.log(err);
  }
};

if (generalHeadlines)
  generalHeadlines.addEventListener('click', function () {
    getTopHeadlines('general');
  });
if (worldHeadlines)
  worldHeadlines.addEventListener('click', function () {
    getTopHeadlines('world');
  });
if (nationHeadlines)
  nationHeadlines.addEventListener('click', function () {
    getTopHeadlines('nation');
  });
if (businessHeadlines)
  businessHeadlines.addEventListener('click', function () {
    getTopHeadlines('business');
  });
if (technologyHeadlines)
  technologyHeadlines.addEventListener('click', function () {
    getTopHeadlines('technology');
  });
if (entertainmentHeadlines)
  entertainmentHeadlines.addEventListener('click', function () {
    getTopHeadlines('entertainment');
  });
if (sportsHeadlines)
  sportsHeadlines.addEventListener('click', function () {
    getTopHeadlines('sports');
  });
if (scienceHeadlines)
  scienceHeadlines.addEventListener('click', function () {
    getTopHeadlines('science');
  });
if (healthHeadlines)
  healthHeadlines.addEventListener('click', function () {
    getTopHeadlines('health');
  });

const getTopHeadlines = async function (id) {
  try {
    const res = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=${String(
        id
      )}&apikey=1f0b1616e135b0f18fb4cb8923c548e8`
    );
    const data = await res.json();
    console.log(id);
    console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(`${data.message}(${res.status})`);
    state.articlesArray = data.articles;
    state.totalArticles = data.totalArticles;
    ['hashchange', 'load'].forEach((ev) =>
      window.addEventListener(ev, displayArticle)
    );
    const markupTotal = function () {
      let total = state.totalArticles;
      let html = `
      <div class="results__total">Total Articles Found - ${total}</div>
      `;
      resultsTotal.innerHTML = '';
      resultsTotal.insertAdjacentHTML('afterbegin', html);
    };
    console.log('Html inserted');

    const markupPreview = function (result, index) {
      return `
      <a href="#${index}">
        <li class="results__list-item"><img class="results__img" crossorigin="anonymous" src="https://newsify.herokuapp.com/${result.image}" alt="${result.title}"/>
          <div class="results__list-item--container">
            <h4 class="results__title">${result.title}</h4>
            <span class="results__source">${result.source.name}</span>
          </div>
        </li>
      </a>
      `;
    };
    console.log(' Second Html generated');
    resultsTotal.innerHTML = '';
    console.log(' Container cleared');
    markupTotal();
    resultsTotal.insertAdjacentHTML(
      'beforeend',
      state.articlesArray.map(markupPreview).join('')
    );
    console.log(' Second Html inserted');
  } catch (err) {
    console.log(err);
  }
};
