const fs = require('fs');
const Tour = require('./../models/tourModel');
const { match } = require('assert');

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
  try{
    //BUILD QUERY 
    //1. FILTERING

    const queryObj = {...req.query}; 
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el=> delete queryObj[el]) 

    //2. ADVANCED FILTERING 
    let queryStr = JSON.stringify(queryObj)
    //regular expression
    queryStr =queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}` );
    const query =  Tour.find(JSON.parse(queryStr));
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
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err, 
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
  try{
   const tour =  await Tour.findById(req.params.id)
   console.log(req.body.maxGroupSize)
    res.status(200).json(
      {
        status: "success",
        data: {
          tour
        }
      })
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err
    })
  }
 
};



exports.updateTour = async (req, res) => {

  try{
    const tour = await  Tour.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data:{
        tour
      }
    })

  }catch(err){
    console.log(err)
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
};

exports.deleteTour = async (req, res) => {

  try{
    const tour = await Tour.findByIdAndDelete(req.params.id, req.body); 
    res.status(204).json({
      status: 'success',
      data: null
    });
  }catch(err){
    res.status(404).json({
      status: 'fail',
      message: err
    })

  }
};

