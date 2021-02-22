// Node Packages
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('../config/db.config');

// Initialize Passport
function initialize(passport) {
    // Authenticate User
    const authenticateUser = async (username, password, done) => {
        // Get User from the db with the given Username
        var user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        user = user.rows[0];

        // If the user does not exist, display a flash message
        if (user == null) {
            return done(null, false, { message: 'No user with that username' });
        }

        // Otherwise...
        try {
            // If the User's password found above matches the password in the login form, return the authenticated User
            if (password == user.user_password) {
                return done(null, user);
            // Otherwise, display a flash message
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (e) {
            return done(e);
        }
    }

    // Use the username and password field as the login identifications
    passport.use(new localStrategy({ usernameField: 'username' }, authenticateUser));

    // Serialize and Deserialize the User
    passport.serializeUser((user, done) => done(null, user.username));
    passport.deserializeUser(async (username, done) => {
        var data = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        data = data.rows[0];
        return done(null, data)
    });
}

// Export the Initialize Passport function
module.exports = initialize;