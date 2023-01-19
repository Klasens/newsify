//* External Modules
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

//* Import App
const app = require('./app');

//* ======= Server ======= //
const port = process.env.port || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
});
