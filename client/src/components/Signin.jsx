import React from "react";
import { GoMarkGithub } from "react-icons/go";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaBookOpen } from "react-icons/fa";
import {Spinner} from 'react-bootstrap'

//////////

import { loginUser } from "../Actions";
import { connect } from "react-redux";

import { Link, withRouter } from "react-router-dom";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      visible: false,
      github: false
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleLogin = event => {
    event.preventDefault();
    this.props.dispatch(
      loginUser(this.state.username, this.state.password, this.props.history)
    );
  };

  handleVisible = () => {
    this.setState({ visible: true });
  };
  handleHidden = () => {
    this.setState({ visible: false });
  };
  render() {
    return (
      <div class="limiter">
        <div class="container-login100">
          <div class="wrap-login100">
            <form
              class="login100-form validate-form"
              onSubmit={this.handleLogin}
            >
              <div className="resc-logo-container">
                <FaBookOpen className="book_logo2" />
                <span className="resource-logo">Resource Library</span>
              </div>
              <div
                class="wrap-input100 validate-input"
                data-validate="Valid email is: a@b.c"
              >
                <input
                  class="input100"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                />

                <span class="focus-input100" data-placeholder=""></span>
              </div>
              <div
                class="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <span class="btn-show-pass">
                  <i class="zmdi zmdi-eye"></i>
                </span>
                <input
                  class="input100"
                  type={this.state.visible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                <span class="focus-input100" data-placeholder=""></span>
                {this.state.password ? (
                  <p className="eyes">
                    {this.state.visible ? (
                      <FiEyeOff onClick={this.handleHidden} />
                    ) : (
                      <FiEye onClick={this.handleVisible} />
                    )}
                  </p>
                ) : null}
              </div>
              <div class="container-login100-form-btn">
                <div class="wrap-login100-form-btn">
                  <div class="login100-form-bgbtn"></div>
                  <button class="login100-form-btn">Login</button>
                </div>
              </div>
              <span class="txt1 txt-1">Or Login with</span>
              <a href="/api/v1/users/auth/github">
                <div
                  class="btn-2"
                  onClick={() => this.setState({ github: true })}
                >
                  {this.state.github ? (
                    <Spinner animation="border" className="github_spinner"  />
                  ) : (
                    <GoMarkGithub className="github_logo" />
                  )}
                </div>
              </a>

              <div class="text-center p-t-115">
                <span class="txt1">Don’t have an account?</span>{" "}
                <Link to="/signup">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(Signin));
