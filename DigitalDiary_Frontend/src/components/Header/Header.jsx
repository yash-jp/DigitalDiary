import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav,NavDropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

const withoutLogin = [
  ["Home", "/home"],
  ["About Us", "/about"],
  ["Login", "/login"],
  ["signup","/signup"]
];
const loggedIn = [
  ["Home", "/home"],
  ["Contacts", "/contact"], //corrected link - yash
  ["Notes", "/notes"],
  ["Expenses", "/expense"],
  ["Contact Us", "/contact"],
  ["Categories","/categories-list"]

];
class Header extends React.Component {
  constructor(props) {
    super(props);
this.state={
  userLoggedIn:false,
  navbarItems:[]
}

    this.handlelogoutbutton = this.handlelogoutbutton.bind(this);
  }

  handlelogoutbutton() {
    this.setState({
      navbarItems: withoutLogin,
      userLoggedIn: false,
    });
    this.props.history.push("/login");
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({
        navbarItems: loggedIn,
        userLoggedIn: true,
      });
    } else{
      this.setState({
        navbarItems: withoutLogin,
        userLoggedIn: false,
      });
    }
  }

  render() {
    return (
      <>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          sticky="bottom"
        >
          <Navbar.Brand href="#home">Digital Diary</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              {this.state.navbarItems.map((navitem, index) => (
                <Link
                  to={{
                    pathname: navitem[1],
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <span style={{ color: "white", paddingRight: "20px" }}>
                    {navitem[0]}
                  </span>
                </Link>
              ))}
              {this.state.userLoggedIn === true ? (
                <button
                  type="submit"
                  variant="outline-light"
                  style={{
                    border: "none",
                    backgroundColor: "#343a40  ",
                    color: "white",
                    fontWeight: "40",
                    marginRight: "20px",
                  }}
                  onClick={this.handlelogoutbutton}
                  value="LOGOUT"
                >
                  LOGOUT
                </button>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default withRouter(Header);
