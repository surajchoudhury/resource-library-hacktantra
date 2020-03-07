import React from "react";
import Loader from "../components/Loader";
import { fetchModule, deleteModule } from "../Actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Prism from "prismjs";
import ModuleCard2 from "../components/ModuleCard2";

class AllModules extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    Prism.highlightAll();
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  handledelete = (id, moduleID) => {
    this.props.dispatch(deleteModule(id, moduleID));
  };

  render() {
    return (
      <main>
        {<ModuleCard2 module={this.props} isMentor={this.props.isMentor} />}
      </main>
    );
  }
}

export default connect()(withRouter(AllModules));
