import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../EditCategory/EditCategory.css";

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: " ",
      description: " ",
      _id: "",
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
    this.setState({
      name: this.props.location.state.category[0].name,
      description: this.props.location.state.category[0].description,
      _id: this.props.location.state.category[0]._id,
    });
  }

  handleNameChange(e) {
    console.log(e.target.value);
    this.setState({
      name: e.target.value,
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      desc: e.target.value,
    });
  }

  handleSubmit(e) {
    let token = localStorage.getItem("token");
    console.log(this.state);
    let config = {
      headers: {
        "x-auth-token": token,
      },
    };

    axios
      .put(
        "https://gladiator-digital-diary-server.herokuapp.com/api/categories",
        this.state,
        config
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  
  render() {
    return (
      <Container fluid className="add-category">
        <Row className="category">
          <Col xs={12} md={10} className="category-col">
            <h1 className="category-title">Edit Your Categories Here.</h1>
          </Col>
        </Row>

        <Row className="category">
          <Col xs={10} className="category-col">
            <Form.Text className="text">Category Name:</Form.Text>
            <Form.Control
              type="text"
              placeholder="Add Category"
              name="name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </Col>
        </Row>
        <Row className="category">
          <Col xs={10} className="category-col">
            <Form.Text className="text">Category Description:</Form.Text>
            <Form.Control
              type="text"
              placeholder="Add Category"
              name="desc"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
          </Col>
        </Row>
        <br />
        <Row className="category-row">
          <Col xs={10} className="category-col">
            <Button variant="success" onClick={this.handleSubmit} block>
              Edit
            </Button>{" "}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Categories);
