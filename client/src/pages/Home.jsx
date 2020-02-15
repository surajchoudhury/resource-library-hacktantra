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
    return <section></section>;
  };

  protectedRoutes = () => {
    return (
      <section>
        <Route path="/signin">
          <Signin />
        </Route>
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
        <Switch>{this.protectedRoutes()}</Switch>
      </main>
    );
  }
}

export default Home;
