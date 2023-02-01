/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { signUp } from './signUp';
import { updateSettings } from './updateSettings';

const signUpForm = document.querySelector('.form--signUp');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('#logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const searchBtn = document.querySelector('.search__btn');

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
  });
