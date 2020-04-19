const mongoose = require('mongoose');
const joi = require('joi');

const Expense = mongoose.model('expense', new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
      },
    expenseTitle: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30
    },
    expenseCategory: {
        type: String,
        minlength: 1,
        maxlength: 30
    },
    expenseCost: {
        type: String,
        minlength: 1,
        maxlength: 15
    },
    expenseDate: {
        type: Date,
        default: Date.now()
    },
    expenseComment: {
        type: String
    }
}));

const validateExpense = function (expense) {
    const schema = {
        expenseTitle: joi.string().min(1).max(30).required(),
        expenseCategory: joi.string().min(1).max(30).required(),
        expenseCost: joi.string().min(1).max(15).required(),
        expenseComment: joi.string().allow('', null)
    };
    return joi.validate(expense, schema);
}

module.exports.Expense = Expense;
module.exports.validateExpense = validateExpense;