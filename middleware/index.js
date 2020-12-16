const Campground = require('../models/Campground');
const Comment = require('../models/Comment');

const middleware = {};

middleware.checkCampgroundOwnership = (req, res, next) => {
  // is user logged in?
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err) {
        req.flash('error', 'Campground not found');
        res.redirect('back');
      } else {
        // does user own the campground or does user have Admin rights?
        foundCampground.author.id.equals(req.user._id) || req.user.isAdmin
          ? next()
          : req.flash('error', `You don't have permission to do that`) &&
            res.redirect('back');
      }
    });
  } else {
    req.flash('error', 'Please sign in');
    res.redirect('back');
  }
};
middleware.checkCommentsOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect('back');
      } else {
        foundComment.author.id.equals(req.user._id) || req.user.isAdmin
          ? next()
          : req.flash('error', `You don't have permission to do that`) &&
            res.redirect('back');
      }
    });
  } else {
    res.redirect('back');
  }
};
middleware.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please sign in');
  res.redirect('/login');
};
middleware.isSessionActive = (req, res, next) => {
  return req.isAuthenticated()
    ? req.flash('error', `Already signed in`) && res.redirect('/campgrounds')
    : next();
};

module.exports = middleware;
