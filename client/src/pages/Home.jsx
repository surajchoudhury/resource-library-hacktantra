import React from "react";
import { Route, Switch } from "react-router-dom";

//relative imports

import Signin from "../components/Signin";
import Dashboard from "./Dashboard";
import ModuleView from "./ModulesView";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogged: false
    };
  }

  publicRoutes = () => {
    return (
      <Route path="/signin">
        <Signin />
      </Route>
    );
  };

  protectedRoutes = () => {
    return (
      <section>
        <Route path="/modules/view">
          <ModuleView />
        </Route>
        <Route exact path="/">
          <Dashboard />
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
