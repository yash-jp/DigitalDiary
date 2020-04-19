import React, { Component } from "react";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "../Signup/signup.css";
import axios from "axios";

export class signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      city: "",
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirstNameChange(e) {
    this.setState({
      firstname: e.target.value,
    });
  }

  handleLastNameChange(e) {
    this.setState({
      lastname: e.target.value,
    });
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleCityChange(e) {
    this.setState({
      city: e.target.value,
    });
  }
  // const [validated, setValidated] :

  handleSubmit(e) {
    e.preventDefault();
    let token = sessionStorage.getItem("token");

    axios
      .post(
        "https://gladiator-digital-diary-server.herokuapp.com/api/users",
        // this.setState({
        //   user:e.target.value
        // })
        this.state
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // setValidated(true);
  }

  render() {
    return (
      <Row>
        {/* <div style={{ color: "orange", textAlign: "center" }}>Sign Up</div> */}
        <Col>
          <div className="center">
            <Form>
              {/* First Name */}
              <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="firstName"
                    value={this.state.firstname}
                    onChange={this.handleFirstNameChange}
                  />
                  {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                </Form.Group>
              </Form.Row>

              {/* Last Name */}
              <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="lastName"
                    value={this.state.lastname}
                    onChange={this.handleLastNameChange}
                  />
                </Form.Group>
              </Form.Row>

              {/* Email */}
              <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom02">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                  {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                </Form.Group>
              </Form.Row>

              {/* Password */}
              <Form.Row>
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                  {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                </Form.Group>

                {/* Confirm Password */}

                {/* <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleConfirmPasswordChange}
                />
                
              </Form.Group> */}
              </Form.Row>

              {/* City */}
              <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom03">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="city"
                    required
                    value={this.state.city}
                    onChange={this.handleCityChange}
                  />
                  {/* <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback> */}
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                />
              </Form.Group>
              <Button type="submit" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

export default signup;
