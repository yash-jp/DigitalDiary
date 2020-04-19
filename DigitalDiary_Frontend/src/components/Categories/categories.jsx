import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Categories/categories.css";

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: " ",
      desc: " ",
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
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
    let config = {
      headers: {
        "x-auth-token": token,
      },
      // body:this.state
    };

    axios
      .post(
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
            <h1 className="category-title">Add Your Categories Here.</h1>
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
              value={this.state.desc}
              onChange={this.handleDescriptionChange}
            />
          </Col>
        </Row>
        <br />
        <Row className="category-row">
          <Col xs={10} className="category-col">
            <Button variant="success" onClick={this.handleSubmit} block>
              Add
            </Button>{" "}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Categories);
