import React from "react";
import Loader from "../components/Loader";
import { fetchModule, deleteModule } from "../Actions";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Prism from "prismjs";
import ModuleCard from "../components/ModuleCard";

class ModulesView extends React.Component {
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
        {this.props.module ? (
          <ModuleCard
            module={this.props.module.module}
            isMentor={this.props.isMentor}
          />
        ) : (
          <Loader />
        )}
      </main>
    );
  }
}

export default connect()(withRouter(ModulesView));
