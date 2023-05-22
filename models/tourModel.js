const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true, 
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have duration']
  },

  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },

  difficulty: {
    type: String, 
    Required: [true, 'A tour must have a difficulty ']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default:0
  },
  price: {
    type: Number,
    require: [true, 'A tour must have a price']
  },
  priceDiscount: Number,

  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description']
  },

  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String, 
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date]
});

  tourSchema.pre('save', function(next) {
    console.log(tour)
    next();
  });

  const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

