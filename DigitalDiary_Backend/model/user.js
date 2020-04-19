const mongoose = require('mongoose');
const joi = require('joi');

/******************************** */
const User = mongoose.model('user',new mongoose.Schema({
  firstname:{
    type:String,
    required:true,
    minlength:3,
    maxlength:15
  },
  lastname:{
    type:String,
    required:true,
    minlength:3,
    maxlength:15
  },
  email:{
    type:String,
    unique:true,
    required:true
  },
  password:{
    type:String,
    required:true,
  },

  city:{
    type:String,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now()
  }
}));

const validateUser = function(user){
  const schema = {
    firstname:joi.string(),
    lastname:joi.string(),
    email:joi.string(),
    password:joi.string(),
    city:joi.string()
  };
  return joi.validate(user,schema);
}

const validateLogin = (user)=>{
  const schema = {
    email:joi.string().email().required(),
    password:joi.string().required()
  }
  return joi.validate(user,schema);
}

module.exports.User = User;
module.exports.validateUser=validateUser;
module.exports.validateLogin = validateLogin;