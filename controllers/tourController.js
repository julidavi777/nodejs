const fs = require('fs');
const Tour = require('./../models/tourModel');

exports.createTour = async (req, res) => {
  try {
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
    console.log(req.query)
    // const tours = await Tour.find();
    //FIRST WAY OF FILTERING 
     const tours = await Tour.find();
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

