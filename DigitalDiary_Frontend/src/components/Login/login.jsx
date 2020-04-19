import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

// validator
import { loginValidator } from "../../validator/validator";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",

      emailError: "",
      passwordError: "",
    };
  }

  componentWillMount() {
    localStorage.clear();
    localStorage.setItem("LoggedIn", "false");
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // check https://gladiator-digital-diary-server.herokuapp.com/ated or not
    // take data from state and make it object
    let data = {
      email: this.state.email,
      password: this.state.password,
    };

    let validateObject = loginValidator(data);

    var isValid= Object.keys(validateObject).length; 

    if(!isValid){
       // call the database
    axios
    .post("https://gladiator-digital-diary-server.herokuapp.com/api/auth", data, null)
    .then((res) => {
      console.log(res.data.status);

      // if success
      if (res.data.status === 0) {
        localStorage.setItem("token", res.data.token);
        // localStorage.setItem("LoggedIn", "true");
        window.location = "/about";
      } else {
        // TODO show error message
        alert("Please try again!");
      }
    })
    .catch((error) => {
      console.log(error.message);
      alert(error.message);
    });
    }else{
      this.setState({emailError:validateObject.emailError,passwordError:validateObject.passwordError});
    }
  };

  render() {
    return (
      <container>
        <div className="my-div">
          <Form className="form-container" onSubmit={this.handleSubmit}>
            <Row className="row-container">
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={this.handleEmailChange}
                  />
                  <Form.Text className="error">
                    {this.state.emailError}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row className="row-container">
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    onChange={this.handlePasswordChange}
                  />
                  <Form.Text className="error">
                    {this.state.passwordError}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Row className="row-container">
              <Col sm={12} className="column-container">
                <Button
                  variant="dark"
                  className="button-container"
                  type="submit"
                  onClick={this.handleSubmit}
                  block
                >
                  Login
                </Button>
              </Col>
            </Row>

            <Row className="row-container signup">
              <Col sm={12} className="column-container">
                {/* TODO forget password link */}
                <Link>Forgot Password</Link>
              </Col>
            </Row>

            <Row className="row-container signup">
              <Col sm={12} className="column-container">
                {/* TODO signup page link */}
                <Link to='/signup'>New User? Please Sign Up</Link>
              </Col>
            </Row>
          </Form>
        </div>
      </container>
    );
  }
}

export default Login;
