const mongoose = require('mongoose');
const joi = require('joi');

/******************************** */
const Contact = mongoose.model('contact',new mongoose.Schema({
  userID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  },
  firstName:{
    type:String,
    required:true,
    minlength:2,
    maxlength:15
  },
  lastName:{
    type:String,
    minlength:3,
    maxlength:15
  },
  category:{
    type:String,
    default:"default"
  },
  email:{type:String},
  address:{
    type:String
  },
  country:{
    type:String,
  },
  city:{
    type:String,
  },
  number:{
    type:String,
  },
  isBookMark:{
    type:Boolean,
    default:false
  }
}));



const validateContact = function(contact){
  const schema = {
    firstName:joi.string().min(2).max(15).required(),
    number:joi.string().required(),
    lastName:joi.string().allow('',null),
    email:joi.string().email().allow('',null),
    category:joi.string().allow('',null),
    address:joi.string().allow('',null),
    country:joi.string().allow('',null),
    isBookMark:joi.boolean().allow('',null).default(false)
  };
  return joi.validate(contact,schema);
}

module.exports.Contact = Contact;
module.exports.validateContact=validateContact;