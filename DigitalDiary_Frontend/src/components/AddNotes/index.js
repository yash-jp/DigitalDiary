import React, { Component } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import AddNotesImg from "../Notes/images/addNotes.png";
import axios from "axios";
class AddNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesName: null,
      notesCategory: null,
      notesTitle: null,
      notesDescription: null,
      isBookmarked: false,
    };

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCategoryChange(e) {
    e.preventDefault();

    this.setState({
      notesCategory: e.target.value,
    });
  }
  handleNameChange(e) {
    e.preventDefault();

    this.setState({
      notesName: e.target.value,
    });
  }
  handleDescriptionChange(e) {
    this.setState({
      notesDescription: e.target.value,
    });
  }

  handleTitleChange(e) {
    e.preventDefault();

    this.setState({
      notesTitle: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let token = localStorage.getItem("token");
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    axios
      .post(
        "https://gladiator-digital-diary-server.herokuapp.com/api/notes",
        this.state,
        config
      )
      .then((res) => this.props.history.push("/notes"))
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <>
        <Container style={{ minHeight: "57vh" }}>
          <Row
            style={{
              marginLeft: "45%",
              marginTop: "32px",
              fontSize: "30px",
            }}
          >
            ADD Notes
          </Row>
          <Row
            style={{
              margin: "20px auto",
              width: "40%",
              height: "50vh",
              textAlign: "center",
              border: "1px solid black",
              boxShadow: "4px 4px #888888",
            }}
          >
            <Col lg={12} style={{ marginTop: "30px" }}>
              Name:
              <input
                style={{ marginLeft: "60px" }}
                type="text"
                name="name"
                onChange={this.handleNameChange}
              ></input>
            </Col>
            <Col lg={12}>
              Title:
              <input
                style={{ marginLeft: "70px" }}
                type="text"
                name="name"
                value={this.state.notesTitle}
                onChange={this.handleTitleChange}
              ></input>
            </Col>
            <Col lg={12}>
              Description:
              <input
                style={{ marginLeft: "20px" }}
                type="text"
                name="name"
                value={this.state.notesDescription}
                onChange={this.handleDescriptionChange}
              ></input>
            </Col>
            <Col lg={12}>
              Category :-
              <select
                style={{ marginLeft: "35px", width: "40%" }}
                onChange={this.handleCategoryChange}
              >
                <option name="home" value="home">
                  Home
                </option>
                <option name="business" value="business">
                  Business
                </option>
                <option name="college" value="college">
                  College
                </option>
              </select>
            </Col>
            <Col>
              <Button variant="success" onClick={this.handleSubmit}>
                ADD
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(AddNotes);
