import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

//relative imports

import Signin from "../components/Signin";
import Dashboard from "./Dashboard";
import CreateModule from "./CreateModule";
import CreateChapter from "./CreateChapter";
import Header from "../components/Header";
import Modules from "./Modules";
import UpdateModule from "./UpdateModule";
import UpdateChapter from "./UpdateChapter";
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
        <Route path={`/modules/chapters/new`}>
          <CreateChapter />
        </Route>
        <Route path={`/modules/chapter/update`}>
          <UpdateChapter />
        </Route>
        <Route path={`/modules/:id`}>
          <Modules />
        </Route>

        <Route exact path="/update">
          <UpdateModule />
        </Route>
        <Route exact path="/create">
          <CreateModule />
        </Route>

        <Route exact path="/">
          <Dashboard />
        </Route>
      </section>
    );
  };

  render() {
    // let isMentor;
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

function mapStatetoProps({ users, subjects }) {
  return {
    isLogged: users.isLogged,
    user: users.user,
    subID: subjects.subId
  };
}

export default connect(mapStatetoProps)(withRouter(Home));
