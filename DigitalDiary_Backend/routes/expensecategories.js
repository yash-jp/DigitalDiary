const express = require("express");
const router = express.Router();
const { Expensecategory } = require("../model/expenseCategory");
const auth = require("../middleware/auth");

//This route is user for getting all the fixed categories of Expense. 
router.get("/", auth, async (req,res) => {
    try {
        const expensecategory = await Expensecategory.find();
        console.log("Category" + expensecategory);

        res
        .status(200)
        .send({status: 0, message: "Successfully fetched categories", expensecategory: expensecategory});
    } catch (error) {
        res.send("error.message");
    }
});

module.exports = router;