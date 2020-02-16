import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

//relative imports

import Signin from "../components/Signin";
import Dashboard from "./Dashboard";
import ModuleView from "./ModulesView";
import Header from "../components/Header";
import Modules from "./Modules";
import { fetchUser, isLogged } from "../Actions";

class Home extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.updateUser();
  }

  updateUser = () => {
    this.props.dispatch(fetchUser());
  };
  oAuth = token => {
    if (token == "undefined" || !token) return;
    localStorage.setItem("token", token);
    this.props.history.push("/");
  };

  // handleLogout = () => {
  //   localStorage.clear();
  //   this.props.dispatch(isLogged(false));
  // };

  publicRoutes = () => {
    return (
      <>
        <Route path="/oauth">
          {this.oAuth(this.props.location.search.split("=")[1])}
        </Route>
        <Route path="/">
          <Signin />
        </Route>
      </>
    );
  };

  protectedRoutes = () => {
    return (
      <section>
        <Route path="/modules">
          <Modules />
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
    let isMentor = this.props.user && this.props.user.user.isMentor;
    return (
      <main>
        {this.props.isLogged && localStorage.token ? <Header /> : null}
        <Switch>
          {localStorage.token || this.props.isLogged
            ? this.protectedRoutes(isMentor)
            : this.publicRoutes()}
        </Switch>
      </main>
    );
  }
}

function mapStatetoProps({ users }) {
  return {
    isLogged: users.isLogged,
    user: users.user
  };
}

export default connect(mapStatetoProps)(withRouter(Home));
