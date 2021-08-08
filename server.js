const express = require('express');
const app = express();
const expbs = require('express-handlebars')
const path = require('path');
const routes = require('./controllers');



app.engine('handlebars', expbs());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
// Routing
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/store', (req, res) => {
    res.render('store');
});

app.get('/login', (req, res) => {
    res.render('login');
}); 

app.get('/loginFunction', (req, res) => {
    res.render('loginFunction');
});

app.listen(8080, () => {
    console.log('Server is starting at port', 8080);
});

