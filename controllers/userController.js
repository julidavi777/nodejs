const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use / updateMyPassword',
        400
      )
    );
  }
  //2. filtered out unwanted fields names that are not allowed to be updated
  const fileteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, fileteredBody, {
    new: true,
    runValidators: true
  });
  // 3 update user document

  res.status(200).json({
    ststus: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById({ id });
  res.status(500).json({
    status: 'error',
    results: user.length,
    data: {
      user
    }
  });
});
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
