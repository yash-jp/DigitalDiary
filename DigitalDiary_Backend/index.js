const express = require("express");
const dbConnect = require("./config/dbConnect");
const config = require("config");
const cors = require('cors')

// ROUTES
const users = require("./routes/users");
const contacts = require("./routes/contacts");
const notes = require("./routes/notes");
const Category = require("./routes/categories");
const expenses = require("./routes/expenses");
const expensecategory = require("./routes/expensecategories");
const auth = require("./routes/auth");

/*******************************************/
const app = express();
app.use(cors());
app.use(express.json());

dbConnect();

// this route will be called for signup
app.use("/api/users", users);

// this route will be called for login
app.use("/api/auth", auth);

// this route will be called for adding contact to specified user which are in token
app.use("/api/contacts", contacts);

// this route will be called for any notes
app.use("/api/notes", notes);

//this route is for displaying the categories of the user logged in
app.use("/api/categories",Category);

//this route will be called for any operation on expenses
app.use("/api/expenses", expenses);

//this route will be called for expense categories
app.use("/api/expenseCategory", expensecategory);

app.listen(process.env.PORT, () =>
  console.log(`Digital Diary lift off on port ${config.get("PORT")}!`)
);
