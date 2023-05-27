const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
//create a schema with name photo password passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please insert a password'],
    minlenght: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(el) {
        //this only works create  on save
        return el === this.password;
      },
      message: 'passwords are not the same'
    }
  },
  passwordChangedAt: Date
});


userSchema.pre('save', async function(next){
    //Only run this function if password was actually modified 
    if(!this.isModified('password')) return next(); 

    //Has the password with costt of 12
    this.password = await bcrypt.hash(this.password, 12 )
    //Delete passwordconfirm field
    this.passwordConfirm = undefined;
    next()
} )

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){

  return await bcrypt.compare(candidatePassword, userPassword) 
  
};
userSchema.methods.changePasswordAfter = function(JWTTimestamp){
  if(this.passwordChangedAt){
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
    console.log(this.passwordChangedAt, JWTTimestamp)
    return( JWTTimestamp < changedTimestamp)    
  }
  return false ; 
}
const User = mongoose.model('User', userSchema);
module.exports = User;
