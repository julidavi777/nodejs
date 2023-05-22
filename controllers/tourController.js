const fs = require('fs');
const Tour = require('./../models/tourModel');
const { match } = require('assert');

exports.aliasTopTours = (req, res, next)=>{
  req.query.limit = '5'; 
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage, summary, difficulty'
  next(); 
}

exports.createTour = async (req, res) => {
  try {
    //BUILD QUERY
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'sucess',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    //BUILD QUERY
    //1. FILTERING

    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    //2. ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    //regular expression
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));
    //--------------------------SORTING --------------------------
    if (req.query.sort) {
      query = query.sort(req.query.sort);
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query.sort('-CreatedAt');
    }
    //----------------------------FIELD LIMITING ------------------
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v')
    }
    //------------------------- PAGINATION -------------------------
    const page = req.query.page*1 || 1; 
    const limit = req.query.limit *1 || 1; 
    const skip = (page -1) * limit; 
    
    query = query.skip(skip).limit(limit)

    if(req.query.page){
      const numTours = await Tour.countDocuments(); 
      if(skip >= numTours) throw new Error('This page does not exist'); 
      
    }




    //EXECUTE QUERY
    const tours = await query;

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
    //FIRST WAY OF FILTERING
    //  const tours = await Tour.find({price: 227});
    //SECOND WAY OF FILTERING

    /*  const tours = await Tour.find();
    .where('duration')
    .equals(5)
    .where('diffuculty)
    .equal('easy'); 
*/
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    console.log(req.body.maxGroupSize);
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id, req.body);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
