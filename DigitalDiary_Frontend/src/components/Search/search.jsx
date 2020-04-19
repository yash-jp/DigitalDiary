import React from "react";

// BOOTSTRAP
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

// CSSs
import "./search.css";

const Search = (props) => {
  return (
    <Row>
      <Col xs={8} className="search-column">
        <Form inline>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <div class='radio-input'><input  type="radio" name="gridRadios" id="gridRadios1" value="firstName" onChange={props.onRadioChanged}/>Name</div>
               <div class='radio-input' ><input   type="radio" name="gridRadios" id="gridRadios2" value="email" onChange={props.onRadioChanged}/>Email</div>
              <div class='radio-input'><input   type="radio" name="gridRadios" id="gridRadios3" value="category" onChange={props.onRadioChanged}/>Category</div>
           
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className="input-search"
            type="search"
            placeholder="search by"
            onChange={props.onTextChanged}
          />
        </Form>
      </Col>
    </Row>
  );
};

export default Search;
