const path = require('path');
const express = require('express');
const session = require('express-session');
const expbs = require('express-handlebars')
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Product } = require('./models');

const app = express();
const PORT = process.env.PORT || 8080;

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
  app.use(session(sess));

// Handlebars settings
app.engine('handlebars', expbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
// Routing
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/store', async (req, res) => {
    const productData = await Product.findAll({});
    const products = productData.map(product => product.get({ plain: true }));
    res.render('store', { products });
});

app.get('/login', (req, res) => {
    res.render('login');
});

sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => {
        console.log('Server is starting at', PORT);
    });
    
})

