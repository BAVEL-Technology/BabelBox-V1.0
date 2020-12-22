/**
* ____    _    ____  _____ _     ____   _____  __
* | __ )  / \  | __ )| ____| |   | __ ) / _ \ \/ /
* |  _ \ / _ \ |  _ \|  _| | |   |  _ \| | | \  /
* | |_) / ___ \| |_) | |___| |___| |_) | |_| /  \
* |____/_/   \_\____/|_____|_____|____/ \___/_/\_\
*/
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const seed = require('./seeds/seed')
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });
const sess = {
  secret: 'ivory-smelt',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
