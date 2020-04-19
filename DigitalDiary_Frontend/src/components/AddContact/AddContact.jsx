import React, { Component } from "react";
import axios from "axios";

// BOOTSTRAP
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import option from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

// VALIDATOR
import { addUpdateValidator } from "../../validator/validator";

// CSSs
import "./AddContact.css";

let token = localStorage.getItem("token");

class AddContact extends Component {
  constructor() {
    super();

    if (!token) {
      // if token is not present throw back to login
      window.location = "/login";
    }

    this.state = {
      contact: {
        firstName: null,
        lastName: null,
        number: null,
        email: null,
        address: null,
        category: null,
        country: null,
        id: null,
      },

      error: null,

      modal: {
        color: "black",
        show: false,
        title: null,
        message: null,
      },
    };
  }

  componentDidMount() {
    // check whether you got any data
    if (
      this.props.location.data.contact != null &&
      this.props.location.data.contact != undefined
    ) {
      this.setState({ contact: this.props.location.data.contact });
    }
  }

  handleChange = (e) => {
    console.log(e.target);
    this.setState({
      contact: {
        ...this.state.contact,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleButtonClick = (e) => {
    // client side validaton
    if (addUpdateValidator(this.state.contact)) {
      const clickTarget = e.target.innerHTML;

      // prepare request headers and body
      let config = {
        headers: {
          // TODO hardcoded toke take it from session
          "x-auth-token":
            token,
          "Content-Type": "application/json",
        },
      };

      let body = {
        ...this.state.contact,
      };

      if (clickTarget === "Add Contact") {
        // remove id from body
        delete body.id;

        console.log(body);

        axios
          .post(
            "https://gladiator-digital-diary-server.herokuapp.com/api/contacts/",
            body,
            config
          )
          .then((res) => {
            console.log(res);
            if (res.data.status === 0) {
              // success so make everythig to it's normal state and show modal
              this.setState({
                contact: {
                  firstName: "",
                  lastName: "",
                  number: "",
                  email: "",
                  address: "",
                  category: "",
                  country: "",
                  id: "",
                },
                error: "success",
                modal: {
                  color: "green",
                  show: true,
                  title: "Success",
                  message: "Contact addedd successfully!",
                },
              });
            } else if (res.data.status === 1) {
              console.log("I'm hereeeee");
              // contact with same name already exist
              this.setState({
                error: "warning",
                modal: {
                  color: "yellow",
                  show: true,
                  title: "Warning",
                  message: "Contact with same name already exist!",
                },
              });
            }
          })
          .catch((error) => {
            console.log(error);
            // failure show error modal retain state
            this.setState({
              error: "failure",
              modal: {
                color: "red",
                show: true,
                title: "Error",
                message: "Please try again!",
              },
            });
          });
      } else {
        // make update call
        axios
          .put(
            "https://gladiator-digital-diary-server.herokuapp.com/api/contacts/",
            body,
            config
          )
          .then((res) => {
            console.log(res);
            // success
            if (res.data.status === 0) {
              this.setState({
                error: "success",
                modal: {
                  color: "green",
                  show: true,
                  title: "Success",
                  message: "Contact updated successfully!",
                },
              });
            }
          })
          .catch((error) => {
            console.log(error);
            this.setState({
              error: "failure",
              modal: {
                color: "red",
                show: true,
                title: "Error",
                message: "Please try again!",
              },
            });
          });

        // this.props.history.push({
        //   pathname: "/contact",
        //   // data:payload
        // });
      }

      // API operation
    } else {
      console.log("validation failed");
      this.setState({
        error: "validation failed",
        modal: {
          color: "red",
          show: true,
          title: "Alert!",
          message: "Please fill all the mandatory field!",
        },
      });
    }
  };

  // onHandleClose for modal
  handleModalClose = () => {
    this.setState({
      modal: {
        show: false,
      },
    });
  };

  render() {
    return (
      <Container fluid className="add-contact-container">
        <Row className="add-contact-row">
          <Col xs={12} md={10} className="add-contact-col">
            <h1 className="add-contact-title">
              {this.props.location.data.title}
            </h1>
          </Col>
        </Row>

        <Row className="add-contact-row">
          <Col xs={10} className="add-contact-col">
            *
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={this.state.contact.firstName}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">{}</Form.Text>
          </Col>
        </Row>

        <Row className="add-contact-row">
          <Col xs={10} className="add-contact-col">
            *
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={this.state.contact.lastName}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">{}</Form.Text>
          </Col>
        </Row>

        <Row>
          <Col xs={10} className="add-contact-col">
            *
            <Form.Control
              type="text"
              placeholder="Enter email"
              name="email"
              value={this.state.contact.email}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">{}</Form.Text>
          </Col>
        </Row>

        <Row>
          <Col xs={10} className="add-contact-col">
            *
            <Form.Control
              type="text"
              placeholder="Enter number"
              name="number"
              value={this.state.contact.number}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">{}</Form.Text>
          </Col>
        </Row>

        <Row>
          <Col xs={10} className="add-contact-col">
            *
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={this.state.contact.address}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">{}</Form.Text>
          </Col>
        </Row>

        <Row
          style={{
            marginLeft: "7%",
          }}
        >
          <Col xs={12} md={2} className="d1">
            *
            <select
              id="dropdown-basic-button"
              title="Category"
              onChange={this.handleChange}
              name="category"
            >
              <option value="default" selected>
                Default
              </option>
              <option value="friends">Friends</option>
              <option value="family">Family</option>
            </select>
          </Col>

          <Col xs={12} md={2} className="d2">
            *
            <select
              id="dropdown-basic-button"
              title="Country"
              onChange={this.handleChange}
              name="country"
            >
              <option value="India">India</option>
              <option value="Canada">Canada</option>
              <option value="USA">USA</option>
            </select>
          </Col>
        </Row>

        <Row>
          <Col xs={10} className="add-contact-col">
            <Button
              variant="outline-dark"
              block
              onClick={this.handleButtonClick}
            >
              {this.props.location.data.buttonTitle}
            </Button>
          </Col>
        </Row>

        {this.state.error ? (
          <Modal
            show={this.state.modal.show}
            onHide={this.handleModalClose}
            animation={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ color: `${this.state.modal.color}` }}>
                {this.state.modal.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.modal.message}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleModalClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
      </Container>
    );
  }
}

export default AddContact;