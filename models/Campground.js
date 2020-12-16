const mongoose = require('mongoose');
const Comment = require('./Comment');

const campgroundSchema = new mongoose.Schema({
  name: String,
  price: String,
  img: String,
  desc: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Comment',
    },
  ],
});
module.exports = mongoose.model('Campground', campgroundSchema);
