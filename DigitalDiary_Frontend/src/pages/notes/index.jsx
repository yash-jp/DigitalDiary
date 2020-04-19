import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import PinnedNotes from "./pinnedNotes";
// import { TPin.Outline } from "react-icons";
import Button from "react-bootstrap/Button";

class Notes extends Component {
  state = {
    data: "",
  };

  componentDidMount() {
    axios
      .get("https://gladiator-digital-diary-server.herokuapp.com/api/notes")
      .then((res) => {
        console.log(res);
        this.setState({
          data: res,
        });
      })
      .catch((err) => console.error(err));
  }

  delete() {
    axios
      .delete("https://gladiator-digital-diary-server.herokuapp.com/api/notes")
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <>
        {/* <Row> */}
        {/* <Col style={{ textAlign: "center" }}>Pinned Notes</Col>
        </Row>
        <Row>
          <Col xl={{ offset: "1", span: "7" }}>
            <PinnedNotes {...this.state}/>
          </Col>
        </Row> */}
        <Row>
          <Col style={{ textAlign: "center" }}>Notes list </Col>
        </Row>
        <Row>
          {this.state.data != ""
            ? this.state.data.data.notes.map((alldata) => {
                return (
                  <>
                    <Col xl={{ span: "3" }} style={{ marginTop: "20px" }}>
                      <Card>
                        <Card.Header>
                          <Row>
                            <Col
                              xl={{ span: "10" }}
                              style={{ textAlign: "center" }}
                            >
                              {alldata.notesName}
                            </Col>
                            {/* <Col xl={{ span: "2" }}>{{ IoIosPin }}</Col> */}
                          </Row>
                        </Card.Header>
                        <Card.Body>
                          <Card.Title style={{ textAlign: "center" }}>
                            {alldata.notesTitle}{" "}
                          </Card.Title>
                          <Card.Text style={{ textAlign: "center" }}>
                            {alldata.notesDescription}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Row>
                            <Col>
                              <Button variant="outline-secondary">ADD</Button>
                            </Col>
                            <Col>
                              <Button
                                variant="outline-secondary"
                                onClick={this.delete}
                              >
                                DELETE
                              </Button>
                            </Col>
                            <Col>
                              <Button variant="outline-secondary">EDIT</Button>
                            </Col>
                          </Row>
                        </Card.Footer>
                      </Card>
                    </Col>
                  </>
                );
              })
            : null}
        </Row>

        {/* {this.state != "" ? this.state.map((data) => console.log(data)) : null} */}
      </>
    );
  }
}

export default Notes;
