/* eslint-disable */
const form = document.querySelector('.form');
const emailInput = document.getElementById('email');
const pwInput = document.getElementById('password');

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      alert('Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = pwInput.value;
  login(email, password);
});
