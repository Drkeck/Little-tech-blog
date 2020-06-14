// node packages.
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const hbs = exphbs.create();

// file dependencies.
const sequelize = require('./config/connection');
const routes = require('./controllers');

// setup.
const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Cookies?
app.use(
    session({
        secret: 'we have no idea what we are talking about.',
        cookie: {},
        resave: false,
        saveUninitialized: false,
        store: new SequelizeStore({
            db: sequelize
        })
    })
);

// middleware.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// server connection.
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});