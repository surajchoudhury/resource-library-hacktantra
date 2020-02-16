import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, FormControl, Button, Form } from "react-bootstrap";
import { FaPowerOff } from "react-icons/fa";
import { isLogged } from "../Actions";
import { connect } from "react-redux";

const Logout = dispatch => {
  localStorage.removeItem("token");
  dispatch(isLogged(false));
};

const Header = (props) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Link to="/">
          <FaPowerOff
            className="logout"
            onClick={() => Logout(props.dispatch)}
          />
        </Link>
      </Navbar>
    </>
  );
};

// function mapStateToProps ({users}) {
// return {
//   isLogged:
// }
// }

export default connect()(Header);
