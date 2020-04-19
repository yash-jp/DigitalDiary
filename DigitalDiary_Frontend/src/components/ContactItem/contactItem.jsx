import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

// CSSs
import "./contactItem.css";
import { Container } from "react-bootstrap";

const ContactItem = (props) => (
  <Col xs={12} md={6} lg={4} className="contact-item polaroid">
    <Card style={{}}>
    <Card.Header>{props.category}</Card.Header>
      <Card.Body>
        <Card.Title> {(props.firstName).charAt(0).toUpperCase()+props.firstName.slice(1)+' '+(props.lastName).charAt(0).toUpperCase()+props.lastName.slice(1)} </Card.Title>
        <Card.Text>
        <p>Number : {props.number}</p>
        <p>Email :  {props.email}</p>
        <p>Country: {props.country}</p>
        <p>Address :{props.address}</p>
        </Card.Text>
        <Container>
          <Row>
            <Col className="edit-contact" onClick={()=>props.onEditClicked(props.id)}>
              <img src="https://img.icons8.com/metro/26/000000/edit.png" />
            </Col>
            <Col className="bookmark-contact" onClick={()=>props.onBookMarkClicked(props.id)}>
              <img src = {(props.isBookMark)?'https://img.icons8.com/office/30/000000/hearts.png':'https://img.icons8.com/ios/30/000000/like.png'}/>
            </Col>
            <Col className="delete-contact" onClick={()=>props.onDeleteClicked(props.id)}>
              <img src="https://img.icons8.com/material-outlined/24/000000/delete-forever.png" />
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  </Col>
);
export default ContactItem;
