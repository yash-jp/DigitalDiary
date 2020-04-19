const mongoose = require('mongoose');
const joi = require('joi');

/******************************** */

const Category = mongoose.model('categories',new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:15
    },
    description:{
        type:String,
        required:true,
        minlength:2,
    }
}));

const validateCat =  function(category){
    const schema = {
        name:joi.string().min(2).max(15).required,
        description:joi.string().allow('',null)
    };
    return joi.validate(validateCat,category);
}

module.exports.Category = Category;
module.exports.validateCat = validateCat;


