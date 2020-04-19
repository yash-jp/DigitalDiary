import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "../category/categoryList.css";

class categoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      _id:"",
      show:""
    };
    this.categoryEdit = this.categoryEdit.bind(this)
    this.categoryDelete = this.categoryDelete.bind(this)
  }

  componentDidMount() {
    let token = localStorage.getItem("token");

    let config = {
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .get(
        "https://gladiator-digital-diary-server.herokuapp.com/api/categories",
        config
      )
      .then((res) => {
        if(res.data == null){
          alert("nothing")
        }
          this.setState({
            category: res.data.category,
          });
      
      })
      .catch((error) => {
        // TODO
        console.log(error.message);
        alert(`ERROR-${error.message}`);
      });
  }
handleClose(){

}
  categoryEdit(id) {
    // let decodedValue = jwt_decode(localStorage.getItem("token"));
    // e.preventDefault();
    // let categories = this.state.category;
    // console.log(e.target);
    let filteredData = this.state.category.filter(category  => category._id === id)
    console.log(filteredData);

    this.props.history.push({
      pathname: "/editcategories",
      state: {
        category: filteredData,
      },
    });
  }
  
  categoryDelete(e){
    e.preventDefault()
    // console.log(id)
    let token = localStorage.getItem("token");
    console.log(e.target.id)
    let id=e.target.id
    let config = {
        headers:{
          'Access-Control-Allow-Origin': '*',
            "x-auth-token":token,
        }
    }


// fetch(`http://localhost:5000/api/categories`,{
//   method:'DELETE',
//   headers:{
//     'Content-Type': 'application/json',
//     'x-auth-token':token
//   },
//   body:id
// }).then(res=>res.json()).then(data=>console.log(data)).catch(err=>console.log(err));


    axios.delete("http://localhost:5000/api/categories/"+id,null ,config)
    .then(res=>{
      console.log(res);
    })
    .catch(error=>{
      console.log(`here ${error.message}`);
    })
  }
  render() {
    return (
      
      <div className="container">
        <h1>Your Categories</h1>
        <div>
          <div className="pull-right btndiv">
            <Button variant="primary"><Link to="/categories" className="btn btn-xs btn-inverse">
              New
            </Link>
            </Button>
          </div>
          <h5 className="mt-0">
            Posts <span className="fw-semi-bold">List</span>
          </h5>
        </div>

        <div className="widget-table-overflow">
          <Table striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th id="action">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.category != ""&&this.state.category!=undefined
                ? this.state.category.map((data) => (
                    <tr>
                      <td>{data.name}</td>
                      <td>{data.description}</td>
                      <td>
                        <Button onClick={(e) => {  
                          e.preventDefault();
                          this.categoryEdit(data._id)}}>Edit</Button>
                      </td>
                      <td >
                        <Button id={data._id}  onClick={this.categoryDelete}>Delete </Button>
                      </td>
                    </tr>
                  ))
                : alert("Your categories are here.")}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}



export default withRouter(categoryList);
