// DOTENV
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Node Packages
const express = require('express');
const app = express();
const pool = require('./config/db.config');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

// Initialize Passport
const initializePassport = require('./config/passport.config');
initializePassport(passport);

// App Set & Use
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));``

// GET '/' => Renders the Home Page with the data of an authenticated User if it exists
app.get('/', async (req, res) => {
    try {   
        // Get all of the Posts from the database
        const posts = await pool.query("SELECT * FROM posts");
        res.render('index', { 
            user: req.user,
            posts: posts.rows
        });
    } catch {
        res.send('An error has occured');
    }
});

// Routes
const loginRoutes = require('./routes/login.routes');
app.use(loginRoutes);
const registerRoutes = require('./routes/register.routes');
app.use(registerRoutes);
const createRoutes = require('./routes/create.routes');
app.use(createRoutes);
const userRoutes = require('./routes/user.routes');
app.use(userRoutes);

// Listen
app.listen(3000, () => {
    console.log('Bear Forum is running at http://localhost:3000');
});