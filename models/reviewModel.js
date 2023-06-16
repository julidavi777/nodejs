//review / rating / createdAt / ref to tour / ref to user
const mongoose = require('mongoose');
const Tour = require('./tourModel')
const slugify = require('slugify');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'please write a review']
    },
    rating: {
      type: Number,
      default: 4,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },

    createdAt: {
      type: Date,
      default: Date.now(),
      Select: false
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'review must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.pre(/^find/, function(next) {
/*   this.populate({
    path: 'tour',
    select: 'name'
  }).populate({
    path: 'user',
    select: 'name photo'
  }); */
 this.populate({
    path: 'user',
    select: 'name photo'
  }); 
  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;


//POST //tour/234few/reviews
//GET //tour/234few/reviews
//GET //tour/234few/reviews/AKSJDFÑL