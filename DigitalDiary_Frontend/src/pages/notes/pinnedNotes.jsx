import React, { Component } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
class PinnedNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinnedData: "",
      pinnedNotes: [
        {
          notesCategory: "notesCategory",
          isBookMarked: false,
          notesName: "newnotesupdated",
          notesTitle: "newnotesTitle",
          notesDescription: "newN",
        },
        {
          notesCategory: "notesCategory",
          isBookMarked: false,
          notesName: "newnotesupdated",
          notesTitle: "newnotesTitle",
          notesDescription: "newN",
        },
        {
          notesCategory: "notesCategory",
          isBookMarked: false,
          notesName: "newnotesupdated",
          notesTitle: "newnotesTitle",
          notesDescription: "newN",
        },
      ],
    };
  }
  render() {
    return (
      <>
        <Row style={{ display: "flex", flexWrap: "nowrap" }}>
          {this.state.pinnedNotes != ""
            ? this.state.pinnedNotes.map((alldata) => {
                return (
                  <>
                    <Col style={{ marginTop: "20px" }}>
                      <Card>
                        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                        <Card.Header>This is the header</Card.Header>
                        <Card.Body>
                          <Card.Title>Card title</Card.Title>
                          <Card.Text>
                            This card has supporting text below as a natural
                            lead-in to additional content.{" "}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <small className="text-muted">
                            Last updated 3 mins ago
                          </small>
                        </Card.Footer>
                      </Card>
                    </Col>
                  </>
                );
              })
            : null}
        </Row>
      </>
    );
  }
}

export default PinnedNotes;
