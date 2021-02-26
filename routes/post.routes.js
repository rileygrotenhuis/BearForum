// Node Modules
const express = require('express');
const router = express.Router();
const checkAuthenticated = require('../util/checkAuthenticated');
const checkNotAuthenticated = require('../util/checkNotAuthenticated');
const passport = require('passport');
const pool = require('../config/db.config');

// GET '/:userID/:postID' => Render an individual post page
router.get('/:userID/:postID', async (req, res) => {
    try {
        // Query through the database and get the selected post
        const post = await pool.query("SELECT * FROM posts WHERE post_id = $1", [req.params.postID]);
        // Render the individual post page
        res.render('../views/post/index', {
            post: post.rows[0],
            user: req.user
        });
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }
});

module.exports = router;