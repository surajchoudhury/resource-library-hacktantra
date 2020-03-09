import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

//relative imports

import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Dashboard from "./Dashboard";
import CreateModule from "./CreateModule";
import CreateChapter from "./CreateChapter";
import Header from "../components/Header";
import Modules from "./Modules";
import UpdateModule from "./UpdateModule";
import UpdateChapter from "./UpdateChapter";
import Footer from "../components/Footer";
import Urls from "./Urls";
import FormUrl from "../components/FormUrl";
import CreateUrl from '../components/CreateUrl';
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
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          <Signin />
        </Route>
      </>
    );
  };

  protectedRoutes = isMentor => {
    return (
      <section>
        {isMentor ? (
          <Route exact path={`/modules/chapters/new`}>
            <CreateChapter />
          </Route>
        ) : null}
        {isMentor ? (
          <Route exact path={`/modules/chapter/update`}>
            <UpdateChapter />
          </Route>
        ) : null}
        {isMentor ? (
          <Route exact path={`/urls/update`}>
            <FormUrl />
          </Route>
        ) : null}
        {isMentor ? (
          <Route exact path={`/urls/create`}>
            <CreateUrl />
          </Route>
        ) : null}
        <Route exact path="/urls">
          <Urls isMentor={isMentor} />
        </Route>
        <Route exact path={`/modules/:id`}>
          <Modules isMentor={isMentor} />
        </Route>
        {isMentor ? (
          <Route exact path="/update">
            <UpdateModule />
          </Route>
        ) : null}
        {isMentor ? (
          <Route exact path="/create">
            <CreateModule />
          </Route>
        ) : null}

        <Route exact path="/">
          <Dashboard isMentor={isMentor} />
        </Route>
      </section>
    );
  };

  render() {
    // let isMentor;
    let isMentor = this.props.user && this.props.user.user.isMentor;
    return (
      <main className="App">
        <Header isLogged={this.props.isLogged} />
        <Switch>
          {localStorage.token || this.props.isLogged
            ? this.protectedRoutes(isMentor)
            : this.publicRoutes()}
        </Switch>
        <Footer />
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
