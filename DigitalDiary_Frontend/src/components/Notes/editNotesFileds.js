import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { withRouter } from "react-router-dom";
class EditNotesFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesCategory: "",
      isBookmarked: "",
      notesName: "",
      notesTitle: "",
      notesDescription: "",
    };

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.updateClicked = this.updateClicked.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.id != "" && this.props.note.length != 0) {
      this.props.note.map((note) => {
        if (note._id === this.props.id) {
          this.setState({
            notesCategory: note.notesCategory,
            isBookmarked: note.isBookmarked,
            notesName: note.notesName,
            notesTitle: note.notesTitle,
            notesDescription: note.notesDescription,
          });
        }
      });
    }
  }
  handleNameChange(e) {
    this.setState({
      notesName: e.target.value,
    });
  }

  handleCategoryChange(e) {
    this.setState({
      notesCategory: e.target.value,
    });
  }

  handleTitleChange(e) {
    this.setState({
      notesTitle: e.target.value,
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      notesDescription: e.target.value,
    });
  }

  updateClicked(e) {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": token,
      },
    };
    axios
      .put(
        `https://gladiator-digital-diary-server.herokuapp.com/api/notes/${e.target.id}`,
        this.state,
        config
      )
      .then((res) => this.props.history.push("/notes"))
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <>
        {this.state.notesName != "" ? (
          <>
            <Container style={{ height: "61.8vh" }}>
              <Row>
                <Col
                  style={{
                    marginTop: "20px",
                    fontSize: "25px",
                    marginBottom: "20px",
                    marginLeft: "43%",
                  }}
                >
                  Update Notes
                </Col>
              </Row>
              <Row>
                <div
                  style={{
                    boxShadow: "4px 4px #888888",
                    border: "1px solid black",
                    width: "47%",
                    margin: "auto",
                  }}
                >
                  <Col style={{ marginLeft: "23%", marginTop: "20px" }}>
                    Name:
                    <input
                      type="text"
                      name=""
                      value={this.state.notesName}
                      onChange={this.handleNameChange}
                      style={{ marginLeft: "60px" }}
                    ></input>
                  </Col>
                  <Col style={{ marginLeft: "23%", marginTop: "20px" }}>
                    Title:
                    <input
                      type="text"
                      name=""
                      value={this.state.notesTitle}
                      onChange={this.handleTitleChange}
                      style={{ marginLeft: "70px" }}
                    ></input>
                  </Col>
                  <Col style={{ marginLeft: "23%", marginTop: "20px" }}>
                    Description:
                    <input
                      type="text"
                      name=""
                      value={this.state.notesDescription}
                      onChange={this.handleDescriptionChange}
                      style={{ marginLeft: "20px" }}
                    ></input>
                  </Col>
                  <Col style={{ marginLeft: "23%", marginTop: "20px" }}>
                    Category:
                    <input
                      type="text"
                      name=""
                      value={this.state.notesCategory}
                      onChange={this.handleCategoryChange}
                      style={{ marginLeft: "40px" }}
                    ></input>
                  </Col>
                  <Col style={{ marginLeft: "32%" }}>
                    <Button
                      style={{
                        textAlign: "right",
                        marginTop: "30px",
                        marginBottom: "20px",
                      }}
                      variant="outline-primary"
                      onClick={this.updateClicked}
                      id={this.props.id}
                    >
                      Update Notes
                    </Button>
                  </Col>
                </div>
              </Row>
            </Container>
          </>
        ) : null}
      </>
    );
  }
}
export default withRouter(EditNotesFields);
