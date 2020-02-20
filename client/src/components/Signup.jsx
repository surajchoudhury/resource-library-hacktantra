import React from "react";
import { withRouter, Link } from "react-router-dom";
import { GoMarkGithub } from "react-icons/go";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { connect } from "react-redux";

////

import { signupUser } from "../Actions";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      password: null,
      visible: false
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSignup = event => {
    event.preventDefault();
    this.props.dispatch(
      signupUser(
        this.state.username,
        this.state.email,
        this.state.password,
        this.props.history
      )
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
      <section>
        <div class="limiter">
          <div class="container-login100">
            <div class="wrap-login100">
              <form
                class="login100-form validate-form"
                onSubmit={this.handleSignup}
              >
                <span class="login100-form-title p-b-26">Welcome</span>
                <span class="login100-form-title p-b-48">
                  <i class="zmdi zmdi-font">
                    <a href="https://resource-library-alt.herokuapp.com/api/v1/users/auth/github">
                      <GoMarkGithub className="github_logo" />
                    </a>
                  </i>
                </span>

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
                  data-validate="Valid email is: a@b.c"
                >
                  <input
                    class="input100"
                    type="text"
                    name="email"
                    placeholder="Email"
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
                    <button class="login100-form-btn">Sign Up</button>
                  </div>
                </div>

                <div class="text-center p-t-115">
                  <span class="txt1">Already have an account?</span>
                  {" "}<Link to="/"> Sign In</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect()(withRouter(Signup));
