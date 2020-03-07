import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, FormControl, Button, Form } from "react-bootstrap";
import { FaPowerOff, FaBookOpen } from "react-icons/fa";
import { isLogged } from "../Actions";
import { connect } from "react-redux";

class Header extends React.Component {
  constructor() {
        super();
        this.state = {
          header: false
        };
      }
      componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent)
      }

  listenScrollEvent = e => {
    if (window.scrollY > 50) {
      this.setState({ header: true });
    } else {
      this.setState({ header: false });
    }
  };

  Logout = dispatch => {
    localStorage.removeItem("token");
    dispatch(isLogged(false));
    window.location.href = "/";
  };

  render() {
    return (
      <>
        <header className={this.state.header ? "header_active" : "header"}>
          <Navbar>
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
              {this.props.isLogged ? (
                <FaPowerOff
                  className="logout"
                  onClick={() => this.Logout(this.props.dispatch)}
                />
              ) : null}
            </Link>
          </Navbar>
        </header>
      </>
    );
  }
}

export default connect()(Header);
