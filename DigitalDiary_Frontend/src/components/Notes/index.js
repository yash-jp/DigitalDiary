import React, { Component } from "react";
import DisplayNotes from "./displayNotes";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Pinned from "./images/pinned.png";
import { Button, Container, Row, Col } from "react-bootstrap";

import Unpinned from "./images/notpinned.png";

import "./notes.css";
import displayNotes from "./displayNotes";
class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesList: [],
    };
    this.pinClicked = this.pinClicked.bind(this);
    this.editClicked = this.editClicked.bind(this);
    this.deleteClicked = this.deleteClicked.bind(this);
    this.addClicked = this.addClicked.bind(this);
  }

  componentWillMount() {
    let token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      window.location = "/login";
    }
    let config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": token,
      },
    };
    axios
      .get(
        "https://gladiator-digital-diary-server.herokuapp.com/api/notes",
        config
      )
      .then((res) => {
        console.log(res.data.notes[0].isBookmarked);
        this.setState({
          notesList: res.data.notes,
        });
      })
      .catch((err) => console.error(err));
  }

  pinClicked(e) {
    let token = localStorage.getItem("token");
    console.log(e.target);
    let config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": token,
      },
    };

    axios
      .put("http://localhost:5001/api/notes", { notesid: e.target.id }, config)
      .then((res) => {
        console.log(res);
        if (res.data.status === 1) {
          if (res.data.data.n === 1) {
            console.log(document.getElementById(res.data.notesid).className);
            if (
              document.getElementById(res.data.notesid).className === "unpinned"
            ) {
              document.getElementById(res.data.notesid).src = Pinned;
              document.getElementById(res.data.notesid).className = "pinned";
            } else if (
              document.getElementById(res.data.notesid).className === "pinned"
            ) {
              document.getElementById(res.data.notesid).src = Unpinned;
              document.getElementById(res.data.notesid).className = "unpinned";
            }
          } else {
            alert("error");
          }
        }
      })
      .catch((err) => console.log(err));
    // document.getElementById(e.target.id).src = Pinned;
  }

  editClicked(e) {
    this.props.history.push({
      pathname: "/editNotes",
      state: { id: e.target.id },
    });
  }

  addClicked(e) {
    this.props.history.push({
      pathname: "/addNotes",
    });
  }
  deleteClicked(e) {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    axios
      .delete(
        // `https://gladiator-digital-diary-server.herokuapp.com/api/notes/${e.target.id}`,
        `http://localhost:5001/api/notes/${e.target.id}`,
        config
      )
      .then((res) =>
        this.setState({
          notesList: res.data.notes,
        })
      )
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <>
        <Row>
          <Col xl={{ offset: "10" }} style={{ marginTop: "30px" }}>
            <Button
              style={{ textAlign: "right" }}
              variant="outline-primary"
              onClick={this.addClicked}
            >
              Add Notes
            </Button>
          </Col>
        </Row>
        <Container style={{ minHeight: "48.8vh" }}>
          <Row style={{ margin: "20px" }}>
            {console.log(this.state.notesList)}
            {this.state.notesList != undefined &&
            this.state.notesList.length != 0
              ? this.state.notesList.map((data, index) => {
                  {
                    console.log(data.isBookmarked);
                  }
                  // if (data.isBookmarked != undefined) {
                  return (
                    <DisplayNotes
                      pinClicked={this.pinClicked}
                      deleteClicked={this.deleteClicked}
                      editClicked={this.editClicked}
                      index={index}
                      note={data}
                    />
                  );
                  // }
                })
              : null}
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(Notes);
