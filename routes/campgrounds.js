const express = require('express');

const router = express.Router();
const Campground = require('../models/Campground');
const middleware = require('../middleware');

// INDEX
// Render campgrounds
router.get('/', (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, (err, campgrounds) => {
    err
      ? console.log('error')
      : res.render('campgrounds/index', { campgrounds, currentUser: req.user });
  });
});
// CREATE
// add campgrounds
router.post('/', middleware.isLoggedIn, (req, res) => {
  const { name } = req.body;
  const { price } = req.body;
  const { image } = req.body;
  const desc = req.body.description;
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  const newCampground = { name, price, img: image, desc, author };
  // create new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    // throw error or redirect back to campgrounds page
    err ? console.log(err) : res.redirect('/campgrounds');
  });
});
// NEW
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});
// SHOW
router.get('/:id', (req, res) => {
  // find campgound with provided ID
  Campground.findById(req.params.id)
    .populate('comments')
    .exec((err, foundCampground) => {
      // render show template with that ID
      if (err) {
        console.log(err);
      } else {
        res.render('campgrounds/show', { campgrounds: foundCampground });
      }
    });
});
// EDIT CAMPGROUND
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render('campgrounds/edit', { campground: foundCampground });
  });
});
// UPDATE CAMPGROUND
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    (err, updatedCampground) => {
      if (err) {
        res.redirect('/');
      } else {
        res.redirect(`/${req.params.id}`);
      }
    }
  );
});
//   DESTROY CAMPGROUND
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });
});
// =======
module.exports = router;
