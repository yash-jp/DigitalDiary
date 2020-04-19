import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

// BOOTSTRAP
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// COMPONENTs
import ContactItem from "../../components/ContactItem/contactItem";
import Search from "../../components/Search/search";

// CSS
import "./BookmarkContacts.css";

let token = localStorage.getItem("token");

class Contact extends Component {
  constructor() {
    super();

    if (!token) {
      // if token is not present throw back to login
      window.location = "/login";
    }

    this.state = {
      contacts: null,
      searchable: {
        isSearch: false,
        searchBy: null,
      },
      filteredArray: null,
      error: null,
      modal: {
        color:'black',
        show: false,
        title:null,
        message:null
      },
    };
  }

  componentDidMount() {
    
    let config = {
      headers: {
        // TODO remove hardcoded token
        "x-auth-token":
          token,
        "Content-Type": "application/json",
      },
    };

    axios
      .get("https://gladiator-digital-diary-server.herokuapp.com/api/contacts", config)
      .then((res) => {
        console.log(res.data);
        this.setState({
          contacts: res.data.contact,
        });
      })
      .catch((error) => {
        // TODO
        console.log(error.message);
        alert(`ERROR-${error.message}`);
      });
  }

  handleEditEvent = (id) => {
    // now here we can update the state
    let dummyContacts = this.state.contacts;

    // iterate over it
    dummyContacts.forEach((c) => {
      if (c._id === id) {
        // if match then go to AddComponent with all the data be ready for migration :)

        // her's your vehicle
        this.props.history.push({
          pathname: "/add-contact",
          data: {
            title: "Update Contact",
            buttonTitle: "Update Contact",
            contact: c,
          },
        });
      }
    });
  };

  handleDeleteEvent = (contactID) => {
    // let config = {
    //   headers: {
    //     // TODO hardcoded toke take it from session
    //     "x-auth-token":
    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTllNTIwZjAwMWRhNGQxNDMzNzk4NiIsImlhdCI6MTU4NjY0MjcyMX0.91yJ_RwwA95pr9Hl5RhYao3fA-Vp2gn_J0EMwk9WDx4",
    //     "Content-Type": "application/json",
    //   },
    // };

    let body = {
      id:contactID
    }

    // console.log(config);

    fetch(
      "https://gladiator-digital-diary-server.herokuapp.com/api/contacts",
      {method: "DELETE",
      headers: {"Content-Type": "application/json","x-auth-token":token},
      body: JSON.stringify(body)
      })
      .then((res) => {
        console.log(res);
        return res.json();
      })      
      .then((data) => {
               console.log(data);
               this.componentDidMount();
                });

  //   axios.delete('http://localhost:5000/api/contacts',body,config)
  //   .then(res=>{
  //     if(res.data.status===0){
  //       this.setState({
  //         error:'success',
  //         modal: {
  //           color:'green',
  //           show: true,
  //           title:'Success',
  //           message:'Contact Deleted Successfully'
  //         }
  //       });
  //     }
  //   })
  //   .catch(error=>{
  //     console.log(error);
  //     // failure
  //     this.setState({
  //       error:'failure',
  //       modal: {
  //         color:'red',
  //         show: true,
  //         title:'Failure',
  //         message:'Please try again'
  //       }
  //     });
  //   });
  };

    // onHandleClose for modal
    handleModalClose = () => {
      this.setState({
        modal: {
          show: false
        },
      });
    };

  handleBookMarkEvent = (id) => {
    console.log(id);
    console.log("Inside Handle BookMark Event");

    // call toggle bookmark route
    let config = {
      // TODO hardcoded make it dynamic
      headers: {
        // TODO remove hardcoded token
        "x-auth-token":
          token,
        "Content-Type": "application/json",
      },
    };

    axios
      .put(
        "http://localhost:5000/api/contacts/toggleBookmark",
        { contactID: id },
        config
      )
      .then((res) => {
        // now here we can update the state
        let dummyContacts = this.state.contacts;

        // iterate over it
        dummyContacts.forEach((c) => {
          if (c._id === id) {
            // then toggle isBookMark value
            c.isBookMark = !c.isBookMark;
          }
        });

        // assign it to state
        this.setState({ contacts: dummyContacts });
      })
      .catch((error) => {
        // TODO Handle Error
        console.log(error);
        alert(`ERROR-${error.message}`);
      });
  };

  handleAddEvent = () => {
    console.log("add clicked");

    // create payload
    let payload = {
      title: "Add Contact",
      buttonTitle: "Add Contact",
      contact: null,
    };

    // lift off
    this.props.history.push({
      pathname: "/add-contact",
      data: payload,
    });
  };

  handleRadioChange = (e) => {
    console.log(e.target);

    // change value of searchable state
    this.setState({
      searchable: {
        isSearch: true,
        searchBy: e.target.value,
      },
    });
  };

  handleSearchChange = (e) => {
    if (this.state.searchable.isSearch) {
      // set main state into dummy state
      let dummyState = this.state;

      // filter it
      let filteredArray = dummyState.contacts.filter((c) => {
        console.log(c);
        if (
          c[`${this.state.searchable.searchBy}`]
            .toUpperCase()
            .includes(e.target.value.toUpperCase())
        ) {
          return true;
        } else {
          return false;
        }
      });

      console.log(`Filtered Array - ${filteredArray}`);
      // pass the filter array to method
      this.setState({
        filteredArray: filteredArray,
      });
    } else {
      // TODO hanlde with model
      alert("please select search by");
    }
  };

  renderContactItem = (contacts) => {
    if (!contacts) {
      return <h1>No Contact Found!</h1>;
    } else {
      return contacts.map((c) => {
        return (
          <ContactItem
            key={c._id}
            id={c._id}
            address={c.address}
            category={c.category}
            firstName={c.firstName}
            lastName={c.lastName}
            email={c.email}
            number={c.number}
            userID={c.userID}
            country={c.country}
            isBookMark={c.isBookMark}
            onEditClicked={this.handleEditEvent}
            onDeleteClicked={this.handleDeleteEvent}
            onBookMarkClicked={this.handleBookMarkEvent}
          />
          
        );
      });
    }
  };

  render() {
    return (
      <Container fluid className="contact-container">
        <Row className="add-contact-row">
          <Col xs={3}></Col>
          <Col xs={3}></Col>
          <Col xs={3}></Col>
          <Col className="add-contact" sm={3}>
            <Button variant="outline-dark" onClick={this.handleAddEvent}>
              Add Contact
            </Button>
          </Col>
        </Row>

        <Row>
          <Col xs={8} className="search-column">
            <Search
              onRadioChanged={this.handleRadioChange}
              onTextChanged={this.handleSearchChange}
            />
          </Col>
        </Row>

        <Row>
          {this.state.filteredArray
            ? this.renderContactItem(this.state.filteredArray)
            : this.renderContactItem(this.state.contacts)}
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
        <Modal.Title style={{color:`${this.state.modal.color}`}}>{this.state.modal.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.modal.message}
            </Modal.Body>
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

export default withRouter(Contact);
