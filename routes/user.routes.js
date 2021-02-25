// Node Modules
const express = require('express');
const router = express.Router();
const checkAuthenticated = require('../util/checkAuthenticated');
const checkNotAuthenticated = require('../util/checkNotAuthenticated');
const passport = require('passport');
const pool = require('../config/db.config');

// GET '/:userID' => Renders a User's profile page with all of their information
router.get('/:userID', async (req, res) => {
    try {
        // Query through the database and get all of the user information
        const user = await pool.query("SELECT * FROM users WHERE username = $1", [req.params.userID]);

        // Query through the database and get all of the posts from the User
        const posts = await pool.query("SELECT * FROM posts WHERE author = $1", [req.params.userID]);

        // Render the User page with their User data and all of their posts
        res.render('user/index', {
            user: user.rows[0],
            posts: posts.rows,
            currUser: req.user
        });
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }
});

module.exports = router;