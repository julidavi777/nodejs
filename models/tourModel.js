const mongoose = require('mongoose')


const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true

    },
    ratingsAverage:{
      type: Number,
      default: 4.5 
    },

    price:{ 
      type: Number, 
      require: [true, 'A tour must have a price']
    },
    priceDiscount: Number, 
    summary: {
      type: String, 
      trim: true,
      required: [true, 'A tour must have a description']
    },
    imageCover: {
      type: String, 
      required: [true, 'A tour must have a cover image']
    },
    description: {
      type: String,
      trim: true
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    startDates: [Date]
  })

  tourSchema.pre('save', function(next){
    console.log('data added to database');
    next(); 
  } 
  );
const Tour = mongoose.model('Tour', tourSchema); 

module.exports = Tour; 