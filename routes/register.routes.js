// Node Modules
const express = require('express');
const router = express.Router();
const pool = require('../config/db.config');
const checkAuthenticated = require('../util/checkAuthenticated');
const checkNotAuthenticated = require('../util/checkNotAuthenticated');
const passport = require('passport');

// GET '/register' => Renders the Registration Form
router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register', { flash: req.flash('msg') });
});

// POST '/register' => Takes the information from the Registration Form, creates a new User and adds it to the database
router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        // Query through the db for a User with the Username given in the Registration Form
        const checkUser = await pool.query("SELECT * FROM users WHERE username = $1", [req.body.username]);
        // If the User does not already exist, add a new User to the db
        if (checkUser.rows[0] == null) {
            const data = await pool.query("INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [req.body.username, req.body.password, req.body.first_name, req.body.last_name, req.body.user_email, req.body.location_city, req.body.location_state, req.body.biography]);
            res.redirect('/login');
        // Otherwise, display an error message and redirect to the register page
        } else {
            req.flash('msg', 'Username already exists');
            res.redirect('/register');
        }
    } catch (e) {
        console.error(e);
        res.redirect('/register');
    }
});

// Export Router
module.exports = router;