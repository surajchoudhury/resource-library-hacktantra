import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, FormControl, Button, Form } from "react-bootstrap";
import { FaPowerOff, FaBookOpen } from "react-icons/fa";
import { isLogged } from "../Actions";
import { connect } from "react-redux";


const Logout = dispatch => {
  localStorage.removeItem("token");
  dispatch(isLogged(false));
  window.location.href = "/";
};


const Header = props => {
  return (
    <>
      <header className="header">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <Link className="link" to="/">
              {" "}
              <FaBookOpen className="book_logo" /> Resource Library
            </Link>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
              {" "}
              <Link className="link" to="/"></Link>
            </Nav.Link>

            <Nav.Link href="#features"></Nav.Link>
            <Nav.Link href="#pricing"></Nav.Link>
          </Nav>

          <Link to="/">
            {props.isLogged ? (
              <FaPowerOff
                className="logout"
                onClick={() => Logout(props.dispatch)}
              />
            ) : null}
          </Link>
        </Navbar>
      </header>
    </>
  );
};

export default connect()(Header);
