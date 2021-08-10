const express = require('express');
const app = express();
const expbs = require('express-handlebars')
const path = require('path');
const sequelize = require('./config/connection');
const { Product } = require('./models');
const PORT = process.env.PORT || 8080;
// Handlebars settings
app.engine('handlebars', expbs());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

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

