const mongoose = require('mongoose');

const Campground = require('./models/Campground');
const Comment = require('./models/Comment');

let data = [
  {
    name: `Bear's Creek`,
    img: `https://cdn.shopify.com/s/files/1/1795/5089/articles/Campsite.png?v=1586035791`,
    desc: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, omnis iste.
            Sequi veniam perferendis cupiditate ad eum non repudiandae fugiat!`,
  },
  {
    name: `Camper's Rest`,
    img: `https://miro.medium.com/max/1200/1*ZwsuiM48pU22ugmPQq_5vA.jpeg`,
    desc: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, omnis iste.
                Sequi veniam perferendis cupiditate ad eum non repudiandae fugiat!`,
  },
  {
    name: `Mountain View`,
    img: `https://i.guim.co.uk/img/media/a6a3dfbaaff0b2a556a71467a015bddd6fde352c/0_952_1999_1199/master/1999.jpg?width=1200&quality=85&auto=format&fit=max&s=f5d5f2d5f6b3bdae08fd8662576085db`,
    desc: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, omnis iste.
                    Sequi veniam perferendis cupiditate ad eum non repudiandae fugiat!`,
  },
  {
    name: `Granite Falls`,
    img: `https://lp-cms-production.imgix.net/news/2019/05/tent-Copy.jpg`,
    desc: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, omnis iste.
                    Sequi veniam perferendis cupiditate ad eum non repudiandae fugiat!`,
  },
];

const seedDb = () => {
  // remove all campgrounds
  Campground.remove({}, (err) => {
    // if (err) {
    //   console.log(err);
    // } else {
    //   console.log('removed campgrounds');
    //   Comment.remove({}, (err) => {
    //     err ? console.log(errr) : console.log('removed comments');
    //   });
    //   // create some campgrounds
    //   data.forEach((seed) => {
    //     Campground.create(seed, (err, campground) => {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         console.log('added campgrounds');
    //         // create some comments
    //         Comment.create(
    //           {
    //             text: 'This place really sucks!',
    //             author: 'Brian',
    //           },
    //           (err, comment) => {
    //             if (err) {
    //               console.log(err);
    //             } else {
    //               campground.comments.push(comment);
    //               campground.save();
    //               console.log('added new comment');
    //             }
    //           }
    //         );
    //       }
    //     });
    //   });
    // }
  });
};

module.exports = seedDb;
