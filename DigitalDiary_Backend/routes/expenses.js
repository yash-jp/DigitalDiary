const express = require("express");
const router = express.Router();
const { Expense, validateExpense } = require("../model/expense");
const auth = require("../middleware/auth");


// This route is to retrive all the expenses added by this user
router.get("/", auth, async (req, res) => {
    try {
        const id = req.user.id;

        const expenses = await Expense.find({ userId: id });

        if (!expenses.length) {
            return res.status(200).send({ status: 0, message: "No Expenses Yet" });
        }

        res.status(200).send({ status: 0, message: "Expenses of following User", expense: expenses });
    } catch (error) {
        console.log("Error getting expenses");
        res.status(500).send({ status: 1, message: error.message });
    }
});

// This route is to add new Expense to the user
router.post("/", auth, async (req, res) => {
    // console.log(req.body)
    try {
        const { error } = validateExpense(req.body);

        if (error) {
            return res
                .send({ status: 1, message: error.details[0].message });
        }

        const userId = req.user.id;

        const expense = new Expense({
            userId: userId,
            expenseTitle: req.body.expenseTitle,
            expenseCategory: req.body.expenseCategory,
            expenseCost: req.body.expenseCost,
            expenseComment: req.body.expenseComment
        });
        const expenseAdd = await expense.save();

        res.status(200).send({ status: 0, message: "Expense Added Successfully", expense: expenseAdd });
    } catch (error) {
        console.log("Add Expense Error" + error.message);
        res.status(500).json({ status: 1, message: "Error adding expense" });
    }
});

// This route is to divide all the expense based on their category
router.get("/:category", auth, async (req, res) => {
    try {
        const userId = req.user.id;

        const category = req.params.category;
        // console.log("userId: "+ userId + "Category: " + category);
        const categoryList = await Expense.find({ userId: userId, expenseCategory: category });

        if (!categoryList.length) {
            return res.status(200).send({ status: 0, message: "No expense in that Category Found!" });
        }

        res
            .status(200)
            .send({ status: 0, message: "Expenses of following category found", expenses: categoryList });
    } catch (error) {
        res.status(500).send({ status: 1, message: "unexpected error occured!" });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const categoryList = await Expense.findByIdAndDelete({ _id: req.params.id });
        res.status(200).send({ status: 0, message: "Expense Deleted", expenses: categoryList });

    } catch (error) {
        res.status(500).send({ status: 1, message: "unexpected error occured!" });
    }
});

module.exports = router;