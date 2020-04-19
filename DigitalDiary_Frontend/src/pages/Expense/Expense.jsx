import React, { Component } from "react";
import "./expense.css";

class expense extends Component {
  constructor() {
    super();
    this.addExpense = this.addExpense.bind(this);
  }

  state = {
    expenseData: [],
    expenseCategory: [],
    filterDataType: false,
  };

  async componentDidMount() {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      window.location = "/login";
    }

    //Expense List API
    await fetch(
      "https://gladiator-digital-diary-server.herokuapp.com/api/expenses",
      {
        method: "GET",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          expenseData: data.expense,
        });
      });
    console.log(this.state.expenseData);
    //Use the data as expenseData.expense[0].

    //Expense Category API
    await fetch(
      "https://gladiator-digital-diary-server.herokuapp.com/api/expenseCategory",
      {
        method: "GET",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          expenseCategory: data.expensecategory,
        });
      });
    console.log(this.state.expenseCategory);
    //Use the data as expenseData.expense[0].

    //Hiding the Delete button
    var status = document.getElementsByClassName("tdButton");

    for (var i = 0; i < status.length; i++) {
      status[i].style.display = "none";
    }
  }

  async addExpense() {
    const token = localStorage.getItem("token");
    var title = document.getElementById("title").value;
    var category = document.getElementById("category").value;
    var cost = document.getElementById("cost").value;
    var comment = document.getElementById("comment").value;

    var result = await fetch(
      "https://gladiator-digital-diary-server.herokuapp.com/api/expenses",
      {
        method: "POST",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expenseTitle: title,
          expenseCategory: category,
          expenseCost: cost,
          expenseComment: comment,
        }),
      }
    );

    this.setState({
      filterDataType: !this.state.filterDataType,
    });
    window.location.reload();
  }

  handleFilter = (e) => {
    const filterType = e.target.getAttribute("value");
    const token = localStorage.getItem("token");
    fetch(
      "https://gladiator-digital-diary-server.herokuapp.com/api/expenses/" +
        filterType,
      {
        method: "GET",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.expenses) {
          console.log(data);
          this.setState({
            expenseData: [
              {
                expenseTitle: "-",
                expenseCategory: "-",
                expenseComment: "-",
                expenseCost: "-",
                expenseDate: "-",
              },
            ],
          });
        } else {
          this.setState({
            expenseData: data.expenses,
          });
        }
      });
  };

  showButton = (e) => {
    const btnValue = document.getElementById("editBtn");
    if (btnValue.value === "Edit") {
      btnValue.value = "Save";
    } else {
      btnValue.value = "Edit";
    }
    var status = document.getElementsByClassName("tdButton");

    for (var i = 0; i < status.length; i++) {
      if (status[i].style.display === "none") {
        status[i].style.display = "block";
      } else {
        status[i].style.display = "none";
      }
    }
  };

  async handleDelete(id) {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure?")) {
      this.setState({
        expenseData: this.state.expenseData.filter((data) => data._id !== id),
      });

      var result = await fetch(
        "https://gladiator-digital-diary-server.herokuapp.com/api/expenses/" +
          id,
        {
          method: "DELETE",
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );
    }
    console.log("Deleted" + result);
  }

  refreshTable() {
    window.location.reload();
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h1 className="mt-4">Expense Manager</h1>

              <hr />

              {/* Date/Time */}
              <p>Last Expense Posted on April 08, 2020 </p>

              <hr />

              {/* Post Content */}
              <p className="lead">
                Good expense system in place gives you better control over your
                company's finances. It also gives you a better understanding of
                what expenses might be coming and allows you to plan for them.
              </p>

              <p>
                You can also see expenses and costs in real-time, which can be
                valuable in addressing any issues early on.
              </p>

              <hr />

              {/* Sidebar Widgets Column  */}
              <div className="col-md-10">
                {/* Add Widget */}
                <div className="card my-4">
                  <h5 className="card-header">Add Expense</h5>
                  <div className="card-body">
                    <div className="input-group">
                      <form method="post" action="handleSubmit()">
                        <label className="font-weight-bold">Title : </label>{" "}
                        <input
                          type="text"
                          className="expenseTitle"
                          id="title"
                        />
                        <label className="font-weight-bold">Category : </label>
                        <select className="expenseCategory" id="category">
                          <option disabled selected>
                            Select a Category
                          </option>
                          {this.state.expenseCategory.map((data) => (
                            <option key={data.categoryTitle}>
                              {data.categoryTitle}
                            </option>
                          ))}
                        </select>{" "}
                        <br />
                        <label className="font-weight-bold">Cost : </label>{" "}
                        <input type="text" className="expenseCost" id="cost" />
                        <label className="font-weight-bold">
                          Comment :{" "}
                        </label>{" "}
                        <textarea className="expenseComment" id="comment" />
                        <br />
                        <span className="input-group-btn">
                          <button
                            className="btn btn-secondary"
                            id="addButton"
                            type="button"
                            onClick={this.addExpense}
                          >
                            Go!
                          </button>
                        </span>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/*  Categories Widget */}
              <div className="card my-6">
                <h5 className="card-header">
                  Filter Expense By Category{" "}
                  <span id="allButton">
                    <button onClick={this.refreshTable} value="All">
                      All
                    </button>
                  </span>
                </h5>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6">
                      <ul className="mb-0">
                        <li value="Food">
                          <a
                            href="javascript:void(0);"
                            onClick={this.handleFilter}
                            value="Food"
                          >
                            Food
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            onClick={this.handleFilter}
                            value="Grocery"
                          >
                            Grocery
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            onClick={this.handleFilter}
                            value="Cloths"
                          >
                            Cloths
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <ul className="mb-0">
                        <li>
                          <a
                            href="javascript:void(0);"
                            onClick={this.handleFilter}
                            value="Electronics"
                          >
                            Electronics
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            onClick={this.handleFilter}
                            value="Bills"
                          >
                            Bills
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            onClick={this.handleFilter}
                            value="Others"
                          >
                            Others
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Widget  */}
              <div className="card my-4">
                <h5 className="card-header">
                  Expense Table
                  <span className="editButton">
                    <input
                      type="button"
                      className="editButton"
                      value="Edit"
                      id="editBtn"
                      onClick={this.showButton}
                    />
                  </span>
                </h5>
                <div className="card-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Cost</th>
                        <th scope="col">Comment</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.expenseData.map((data) => (
                        <tr>
                          <td>{data.expenseTitle}</td>
                          <td>{data.expenseCategory}</td>
                          <td>{data.expenseCost}</td>
                          <td>{data.expenseComment}</td>
                          <td>
                            {new Date(data.expenseDate).toLocaleDateString()}
                          </td>
                          <td className="tdButton">
                            <input
                              type="button"
                              className="deleteButton"
                              value="DELETE"
                              onClick={(e) => {
                                e.preventDefault();
                                this.handleDelete(data._id);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default expense;
