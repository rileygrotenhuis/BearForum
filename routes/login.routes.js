// Node Modules
const express = require('express');
const router = express.Router();
const checkAuthenticated = require('../util/checkAuthenticated');
const checkNotAuthenticated = require('../util/checkNotAuthenticated');
const passport = require('passport');

// GET Login Page => '/login'
router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login');
});

// POST Login Page => '/login'
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// DELETE: Logout => '/logout'
router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

// Export Router
module.exports = router;