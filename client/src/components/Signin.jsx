import React from "react";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
  }

  render() {
    return <section>
      <div class="form_container">
    <div class="button_container">
      <div id="btn"></div>
      <button type="button" class="toggle-btn">Login</button>
      <button type="button" class="toggle-btn">Regester</button>
    </div>
    <div class="social-icons">
      <img src="./assets/images/GitHub-Mark.png" alt="" />  
    </div>

    <form id="login" class="input-group" action="" method="POST">
      <input class="input-field" type="text" name="" placeholder="User Id" required />
      <input class="input-field" type="text" name="" placeholder="Enter Password" />
      <input type="checkbox" class="check-box"/><span>Remember Password</span>
      <button class="submit-btn" type="submit">log in</button>
    </form>

    <form id="register" class="input-group" action="" method="POST">
      <input class="input-field" type="text" name="" placeholder="User Id" required />
      <input class="input-field" type="text" name="" placeholder="Email id" required />
      <input class="input-field" type="text" name="" placeholder="Enter Password" />
      <input type="checkbox" class="check-box" /><span>agree terms and condition</span>
      <button class="submit-btn" type="submit">Regester</button>
    </form>
  </div>
    </section>;
}
}

export default Signin;
