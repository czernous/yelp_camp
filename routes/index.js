const express = require('express');

const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const middleware = require('../middleware');

router.get('/', (req, res) => {
  res.render('landing');
});

router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash('error', err.message);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      req.flash('success', `Welcome to YelpCamp, ${user.username}`);
      res.redirect('/campgrounds');
    });
  });
});
router.get('/login', middleware.isSessionActive, (req, res) => {
  res.render('login');
});
router.post(
  '/login',
  passport.authenticate('local', {
    successFlash: 'Welcome back!',
    successRedirect: '/campgrounds',
    failureFlash: 'Invalid username or password.',
    failureRedirect: '/login',
  })
);
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', `Logged out`);
  res.redirect('/campgrounds');
});

module.exports = router;
