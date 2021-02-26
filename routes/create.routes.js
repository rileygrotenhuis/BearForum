// Node Modules
const express = require('express');
const router = express.Router();
const checkAuthenticated = require('../util/checkAuthenticated');
const checkNotAuthenticated = require('../util/checkNotAuthenticated');
const passport = require('passport');
const pool = require('../config/db.config');

// GET '/create' => Renders the Create Post Form
router.get('/create', checkAuthenticated, (req, res) => {
    res.render('create', {
        user: req.user
    });
});

// POST '/create' => Takes the information from the Create Post Form, creates a new Post and adds it to the database
router.post('/create', checkAuthenticated, async (req, res) => {
    try {
        // Get the current date
        const date = new Date().toString();

        // Using the information given in the form, add a new Post to the database and redirect them back to the Home Page
        const newPost = await pool.query("INSERT INTO posts VALUES ($1, $2, $3, $4, $5, $6)", [date, req.body.title, req.body.topic, req.body.author, date, req.body.content]);
        res.redirect('/');
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }
});

// Export Router
module.exports = router;