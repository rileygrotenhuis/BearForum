// Checks if a user is already authenticated
function checkNotAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

module.exports = checkNotAuthenticated;