import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import EditIcon from "./images/editicon.png";
import DeleteIcon from "./images/delete.png";
import Unpinned from "./images/notpinned.png";
import { withRouter } from "react-router-dom";
import Pinned from "./images/pinned.png";
function DisplayNotes(props) {
  console.log(props.note.isBookmarked);
  return (
    <>
      <Card
        style={{
          marginTop: "5px",
          width: "18rem",
          marginLeft: "55px",
        }}
      >
        <Card.Body>
          <Card.Title>
            <Row>
              <Col md={9}>{props.note.notesName} </Col>
              <Col md={3}>
                {props.note.isBookmarked === "unpinned" ? (
                  <img
                    src={Unpinned}
                    height="20px"
                    width="20px"
                    onClick={props.pinClicked}
                    id={props.note._id}
                    className="unpinned"
                  ></img>
                ) : (
                  <img
                    src={Pinned}
                    height="20px"
                    width="20px"
                    onClick={props.pinClicked}
                    id={props.note._id}
                    className="pinned"
                  ></img>
                )}
              </Col>
            </Row>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.note.notesTitle}
          </Card.Subtitle>
          <Card.Text>{props.note.notesDescription}</Card.Text>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <img
                src={EditIcon}
                height="20px"
                width="20px"
                onClick={props.editClicked}
                id={props.note._id}
              ></img>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <img
                src={DeleteIcon}
                height="20px"
                width="20px"
                onClick={props.deleteClicked}
                id={props.note._id}
              ></img>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default withRouter(DisplayNotes);
