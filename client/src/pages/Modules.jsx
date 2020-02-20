import React from "react";
import ModulesView from "./ModulesView";
import ChaptersView from "./ChaptersView";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { fetchModule, fetchSubject, fetchChapter } from "../Actions";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import { Link, withRouter } from "react-router-dom";
import Prism from "prismjs";

class Modules extends React.Component {
  constructor() {
    super();

    this.state = {
      title: null,
      description: null,
      body: null,
      faq: null,
      chapter: false,
      current: null
    };
  }

  componentDidMount() {
    this.props.dispatch(
      fetchSubject(this.props.location.pathname.split("=")[1])
    );
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleGetModule = (event, id, moduleID) => {
    event.preventDefault();
    this.setState({ chapter: false });
    this.props.dispatch(fetchModule(id, moduleID));
  };

  handleCheck = id => {
    this.setState({
      current: id
    });
  };
  handleUncheck = id => {
    this.setState({
      current: id
    });
  };

  getChapter = (subid, modid, chid) => {
    this.setState({ chapter: true });
    this.props.dispatch(fetchChapter(subid, modid, chid));
  };

  renderTooltip = props => {
    return <Tooltip {...props}>Add a Model</Tooltip>;
  };

  render() {
    return (
      <main>
        {this.props.subject ? (
          <div className="wrapper d-flex align-items-stretch">
            <nav id="sidebar">
              <div className="custom-menu">
                <button
                  type="button"
                  id="sidebarCollapse"
                  className="btn btn-primary"
                >
                  <i className="fa fa-bars"></i>
                  <span className="sr-only">Toggle Menu</span>
                </button>
              </div>
              <h1>
                <span className="logo">
                  <span>Modules</span>
                  {this.props.isMentor ? (
                    <Link to="/create" className="link">
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={this.renderTooltip}
                      >
                        <AiOutlinePlusCircle className="add_module" />
                      </OverlayTrigger>
                    </Link>
                  ) : null}
                </span>
              </h1>

              <ul className="list-unstyled components mb-5">
                {this.props.subject.subject.modules.length ? (
                  this.props.subject.subject.modules.map((model, index) => (
                    <span>
                      <span className="models_cont_big">
                        <input
                          type="checkbox"
                          name=""
                          id="model_chk"
                          checked={
                            this.state.current === String(index) ? true : false
                          }
                        />
                        <div className="models_cont">
                          <label htmlFor="model_chk" id={index}>
                            {" "}
                            <IoIosArrowDown
                              className="chk_chapter"
                              onClick={event => {
                                !this.state.checked
                                  ? this.handleCheck(
                                      event.target.parentElement.getAttribute(
                                        "id"
                                      )
                                    )
                                  : this.handleUncheck(
                                      event.target.parentElement.getAttribute(
                                        "id"
                                      )
                                    );
                              }}
                            />
                          </label>
                          <span
                            className="active"
                            onClick={event =>
                              this.handleGetModule(
                                event,
                                this.props.subject.subject._id,
                                model._id
                              )
                            }
                          >
                            {model.title}
                          </span>{" "}
                          {this.props.isMentor ? (
                            <Link to="/modules/chapters/new" className="link">
                              <AiOutlinePlusCircle
                                className="add_module"
                                onClick={() => {
                                  this.props.dispatch(
                                    fetchModule(
                                      this.props.subject.subject._id,
                                      model._id
                                    )
                                  );
                                }}
                              />
                              <span className="add_mod">Add a Chapter</span>
                            </Link>
                          ) : (
                            <span className="add_module"></span>
                          )}
                        </div>

                        {model.chapters.length ? (
                          model.chapters.map(chapter => (
                            <span className="chapters_cont">
                              <p
                                className="chapter_title_small"
                                onClick={() => {
                                  this.getChapter(
                                    this.props.subject.subject._id,
                                    model._id,
                                    chapter._id
                                  );
                                }}
                              >
                                {chapter.title}
                              </p>
                            </span>
                          ))
                        ) : (
                          <span className="chapters_cont">
                            <p className="chapter_title_small">
                              NO Chapters created yet!
                            </p>
                          </span>
                        )}
                      </span>{" "}
                    </span>
                  ))
                ) : (
                  <li className="active">
                    <a href="#">
                      <span className="fa fa-home mr-3"></span> No Modules
                      created yet!
                    </a>
                  </li>
                )}
              </ul>
            </nav>

            {!this.state.chapter ? (
              <div id="content" className="p-4 p-md-5 pt-5">
                {this.props.module ? (
                  <ModulesView module={this.props.module} />
                ) : (
                  <p>Click on a module to read</p>
                )}
              </div>
            ) : (
              <div id="content" className="p-4 p-md-5 pt-5">
                {this.props.chapter ? (
                  <ChaptersView chapter={this.props.chapter} />
                ) : (
                  <Loader />
                )}
              </div>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </main>
    );
  }
}

function mapStatetoProps({ subjects, modules }) {
  return {
    subject: subjects.subject,
    module: modules.module,
    chapter: modules.chapter
  };
}
export default connect(mapStatetoProps)(withRouter(Modules));
