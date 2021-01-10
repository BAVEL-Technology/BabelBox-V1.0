/**
=======================================================================
=      =======  =====      ====        ==  ========  ==================
=  ===  =====    ====  ===  ===  ========  ========  ==================
=  ====  ===  ==  ===  ====  ==  ========  ========  ==================
=  ===  ===  ====  ==  ===  ===  ========  ========  ======   ===  =  =
=      ====  ====  ==      ====      ====  ========    ===     ==  =  =
=  ===  ===        ==  ===  ===  ========  ========  =  ==  =  ===   ==
=  ====  ==  ====  ==  ====  ==  ========  ========  =  ==  =  ===   ==
=  ===  ===  ====  ==  ===  ===  ========  ========  =  ==  =  ==  =  =
=      ====  ====  ==      ====        ==        ==    ====   ===  =  =
=======================================================================
*/
// const chalk = require('chalk');
// const figlet = require('figlet');
const schedule = require('node-schedule');
const moment = require('moment');
const statistics = require('./utils/statistics.js');
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });
const socket = require('socket.io');
const { Portal } = require('./models');
const sess = {
  secret: 'ivory-smelt',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
sequelize.sync({ force: false }).then(() => {
  const server = app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}`));
  const io = socket(server);
  app.set('socketio', io);
  io.sockets.on('connection', newConnection);

  function newConnection(socket) {
    console.log('new connection: ' + socket.id);
    socket.on('I got it wrong', callback);
    
    socket.on('statistics', (data) => {
      console.log('page load: ' + data.loadTime)
      statistics.record(socket.handshake.address, Date.now(), socket.handshake.headers.referer, data.message, socket.request.headers['user-agent'], data.loadTime)
    })
    function callback (data) {
      console.log('Got it yall');
      socket.broadcast.emit('You fooled someone', data);
    }
  }
});
