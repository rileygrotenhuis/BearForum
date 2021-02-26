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

// GET '/:userID/:postID/update' => Render the Update Post Form
router.get('/:userID/:postID/update', checkAuthenticated, async (req, res) => {
    try {
        // Query through the database and get the selected post
        const post = await pool.query("SELECT * FROM posts WHERE post_id = $1", [req.params.postID]);
        res.render('../views/post/update', {
            user: req.user,
            post: post.rows[0]
        });
    } catch (e) {
        console.error(e);
        res.redirect('/' + req.params.userID);
    }
});

// PUT '/:userID/:postID/update' => Update the post in the database with the new information
router.put('/:userID/:postID/update', checkAuthenticated, async (req, res) => {
    try {
        await pool.query("UPDATE posts SET title = $1, topic = $2, content = $3 WHERE post_id = $4", [req.body.title, req.body.topic, req.body.content, req.params.postID]);

        res.redirect('/' + req.params.userID + '/' + req.params.postID);
    } catch (e) {
        console.error(e);
        res.redirect('/' + req.params.userID + '/' + req.params.postID);
    }
});

// DELETE '/:userID/:postID/delete' => Delete a post in the database
router.delete('/:userID/:postID/delete', checkAuthenticated, async (req, res) => {
    try {
        // Delete the given post
        await pool.query("DELETE FROM posts WHERE post_id = $1", [req.params.postID]);
        // Redirect the User back to the Home Page
        res.redirect('/');
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }
});

module.exports = router;