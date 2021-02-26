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
        res.render('../views/user/index', {
            user: user.rows[0],
            posts: posts.rows,
            currUser: req.user
        });
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }
});

// GET '/:userID/update' => Renders the Update User Information Form with the given information already included
router.get('/:userID/update', checkAuthenticated, async (req, res) => {
    try {   
        res.render('../views/user/update', {
            user: req.user
        });
    } catch (e) {
        console.error(e);
        res.redirect('/' + req.params.userID);
    }
});

// PUT '/:userID/update' => Updates the database with the new information
router.put('/:userID/update', checkAuthenticated, async (req, res) => {
    try {
        // Update the database with the new information given from the form
        await pool.query("UPDATE users SET first_name = $1, last_name = $2, user_email = $3, location_city = $4, location_state = $5, biography = $6 WHERE username = $7", [req.body.first_name, req.body.last_name, req.body.user_email, req.body.location_city, req.body.location_state, req.body.biography, req.params.userID]);
        // Redirect back to the User Page
        res.redirect('/' + req.params.userID);
    } catch (e) {
        console.error(e);
        res.redirect('/' + req.params.userID);
    }
});

// DELETE '/:userID/delete' => Deletes a user from the database as well as all of their posts
router.delete('/:userID/delete', checkAuthenticated, async (req, res) => {
    try {
        // Delete all posts from that User
        await pool.query("DELETE FROM posts WHERE author = $1", [req.params.userID]);
        // Delete the User from the datab
        await pool.query("DELETE FROM users WHERE username = $1", [req.params.userID]);
        // Log user out and redirect user back to Home Page
        req.logOut();
        res.redirect('/');
    } catch (e) {
        console.error(e);
        res.redirect('/' + req.params.userID);
    }
});

module.exports = router;