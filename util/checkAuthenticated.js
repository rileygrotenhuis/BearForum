// Checks if a user not already authenticated
function checkAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = checkAuthenticated;