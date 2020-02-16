import React from "react";
import { GoMarkGithub } from "react-icons/go";

//////////

import { loginUser } from "../Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    };
  }

  onchange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleLogin = event => {
    event.preventDefault();
    this.props.dispatch(loginUser(this.props.username, this.props.password));
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
              <span class="login100-form-title p-b-26">Welcome</span>
              <span class="login100-form-title p-b-48">
                <i class="zmdi zmdi-font">
                  <Link to="api/v1/users/auth/github">
                    <GoMarkGithub className="github_logo" />
                  </Link>
                </i>
              </span>

              <div
                class="wrap-input100 validate-input"
                data-validate="Valid email is: a@b.c"
              >
                <input class="input100" type="text" name="username" />
                <span class="focus-input100" data-placeholder="Username"></span>
              </div>

              <div
                class="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <span class="btn-show-pass">
                  <i class="zmdi zmdi-eye"></i>
                </span>
                <input class="input100" type="password" name="pass" />
                <span class="focus-input100" data-placeholder="Password"></span>
              </div>

              <div class="container-login100-form-btn">
                <div class="wrap-login100-form-btn">
                  <div class="login100-form-bgbtn"></div>
                  <button class="login100-form-btn">Login</button>
                </div>
              </div>

              <div class="text-center p-t-115">
                <span class="txt1">Don’t have an account?</span>
                <a class="txt2" href="#">
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Signin);
