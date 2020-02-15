import React from "react";
import Signin from "../components/Signin";
import { Route, Switch } from "react-router-dom";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogged: false
    };
  }

  publicRoutes = () => {
    return (
      <section>
        <Route path="/signin">
          <Signin />
        </Route>
      </section>
    );
  };

  protectedRoutes = () => {
    return (
      <section>
        <Route path="/">
          <p>homepage</p>
        </Route>
      </section>
    );
  };

  render() {
    return (
      <main>
        <Switch>
          {localStorage.token ? this.protectedRoutes() : this.publicRoutes()}
        </Switch>
      </main>
    );
  }
}

export default Home;
