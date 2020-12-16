const express = require('express');

const router = express.Router({ mergeParams: true });
const Campground = require('../models/Campground');
const Comment = require('../models/Comment');
const middleware = require('../middleware');

router.get('/new', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    err ? console.log(err) : res.render('comments/new', { campground });
  });
});

router.post('/', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      req.flash('error', 'Campground not found');
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          req.flash('error', `Error, couldn't create a comment`);
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash('success', `Successfully created comment`);
          res.redirect(`/campgrounds/${campground._id}`);
        }
      });
    }
  });
});

router.get(
  '/:comment_id/edit',
  middleware.checkCommentsOwnership,
  (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        req.flash('error', `You don't have permission to edit this comment`);
        res.redirect('back');
      } else {
        res.render('comments/edit', {
          campground_id: req.params.id,
          comment: foundComment,
        });
      }
    });
  }
);
router.put('/:comment_id', middleware.checkCommentsOwnership, (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    (err, updatedComment) => {
      err
        ? res.redirect('back')
        : res.redirect(`/campgrounds/${req.params.id}`);
    }
  );
});
router.delete('/:comment_id', middleware.checkCommentsOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    err
      ? req.flash(
          'error',
          `You don't have permission to delete this comment`
        ) && res.redirect('back')
      : req.flash('success', `Comment deleted`) &&
        res.redirect(`/campgrounds/${req.params.id}`);
  });
});

module.exports = router;
