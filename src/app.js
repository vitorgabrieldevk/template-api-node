const express = require('express');
const requestValidator = require('express-validator');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

// custom modules
const { MySQL } = require('./db');
const allRoutes = require('./routes');

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.disable('x-powered-by');
app.use(
  morgan('dev', {
    skip: () => app.get('env') === 'test'
  }),
);
app.use(requestValidator());

app.set('view engine', 'ejs');
app.use('/assets', express.static(path.join(__dirname, 'views', 'assets')));
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});


MySQL.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.info(`App running at http://localhost:${PORT}`));
  })
  .catch(err => console.log('error', err));

app.use(allRoutes);

module.exports = app;
