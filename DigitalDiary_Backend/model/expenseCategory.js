const mongoose = require('mongoose');
const joi = require('joi');

const Expensecategory = mongoose.model('expensecategory', new mongoose.Schema({
    categoryTitle: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30
    },
    expenseId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'expense',
        required:true
    }
}));

const validateExpenseCategory = function (expenseCategories) {
    const schema = {
        categoryTitle: joi.string().min(1).max(30).required()
    };
    return joi.validate(expenseCategory, schema);
}

module.exports.Expensecategory = Expensecategory;
module.exports.validateExpenseCategory = validateExpenseCategory;