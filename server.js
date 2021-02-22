// DOTENV
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Node Packages
const express = require('express');
const app = express();
const pool = require('./config/db.config');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

// Initialize Passport
const initializePassport = require('./config/passport.config');
initializePassport(passport);

// App Set/Use
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// GET Home Page => '/'
app.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

// GET Login Page => '/login'
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login');
});

// POST Login Page => '/login'
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// DELETE: Logout => '/logout'
app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

// GET Register Page => '/register'
app.get('/register', (req, res) => {
    res.render('register');
});

// Authenticated Check
function checkAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

// Not Authenticated Check
function checkNotAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

// Listen
app.listen(3000, () => {
    console.log('Bear Forum is running at http://localhost:3000');
});