const Tour = require('../models/tourModel')
const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
exports.getOverview = catchAsync(  async(req, res, next) =>{
    // 1) Get tour data from collection 
    const tours = await Tour.find(); 
    //2) Build template 
    //3) render that template using tour data from 1)
    res.status(200).render('overview', {
        title: 'All Tours',
        tours
    }); 
    
}); 

exports.getTour = catchAsync( async (req, res, next)=>{
    //1) get the data, fot eht requested tour 
    const tour = await Tour.findOne({slug: req.params.slug}).populate({
        path: 'reviews',
        fields: 'review rating user'
    })
    //2<) Build templeta 

    //3) Build template using data from 1) 
    console.log(req.params.slug)
    res.status(200).render('tour',{
      title: `${tour.name} Tour`,
      tour
    })
}); 

exports.getLoginForm = catchAsync( async (req,res)=>{
  res.status(200).render('login', {
    title: 'Log into your account'
  })
    
  

})
exports.getSignUpForm = (res,req)=>{
    res.status(200).render('signup',{
        title: 'Sign up into your account'
    })
}