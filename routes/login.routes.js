// Node Modules
const express = require('express');
const router = express.Router();
const checkAuthenticated = require('../util/checkAuthenticated');
const checkNotAuthenticated = require('../util/checkNotAuthenticated');
const passport = require('passport');

// GET '/login' => Renders the Login Form
router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login', { user: req.user });
});

// POST '/login' => Authenticates the User who logged in and redirect them to the Home Page
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// DELETE '/logout' => Logs the current authenticated User out and redirects them to the Login Page
router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

// Export Router
module.exports = router;