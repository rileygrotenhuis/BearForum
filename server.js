// Node Packages
const express = require('express');
const app = express();

// View Engine
app.set('view engine', 'ejs');

// GET Home Page => '/'
app.get('/', (req, res) => {
    res.render('index');
});

// GET Login Page => '/login'
app.get('/login', (req, res) => {
    res.render('login');
});

// GET Register Page => '/register'
app.get('/register', (req, res) => {
    res.render('register');
});

// Listen
app.listen(3000, () => {
    console.log('Bear Forum is running at http://localhost:3000');
});