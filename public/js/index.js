import { login } from './login';

const form = document.querySelector('.form');
const emailInput = document.getElementById('email');
const pwInput = document.getElementById('password');

if (form)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = pwInput.value;
    console.log(email, password);
    login(email, password);
  });
