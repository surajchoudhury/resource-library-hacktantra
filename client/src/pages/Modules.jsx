import React from "react";
import AllModules from "./AllModules";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import {
  fetchModule,
  fetchSubject,
  fetchChapter,
  fetchModules
} from "../Actions";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import { Link as AncLink, withRouter } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";
import { FaBook, FaBookOpen } from "react-icons/fa";

// import SidebarModule from "../components/SidebarModule";

class Modules extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      description: null,
      body: null,
      checked: true
    };
  }

  componentDidMount() {
    this.props.dispatch(
      fetchSubject(this.props.location.pathname.split("=")[1])
    );
    this.props.dispatch(
      fetchModules(this.props.location.pathname.split("=")[1])
    );
  }
  scrollToTop = () => {
    scroll.scrollToTop();
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleGetModule = (event, id, moduleID) => {
    event.preventDefault();
    this.setState({ chapter: false });
    this.props.dispatch(fetchModule(id, moduleID));
  };

  handleToggle = () => {
    this.setState({ checked: false });
  };

  getChapter = (subid, modid, chid) => {
    this.setState({ chapter: true });
    this.props.dispatch(fetchChapter(subid, modid, chid));
  };

  renderTooltip = props => {
    return <Tooltip {...props}>Add a Module</Tooltip>;
  };

  render() {
    return (
      <main>
        {this.props.modules &&
        this.props.subject &&
        this.props.modules.success ? (
          <div className="wrapper d-flex align-items-stretch">
            <input type="checkbox" name="" id="book_menu" />
            <article className="article_content">
              <div id="content">
                {this.props.modules.module.map(module => (
                  <AllModules {...module} isMentor={this.props.isMentor} />
                ))}
              </div>
            </article>
            <input type="checkbox" id="side_chk" checked={this.state.checked} />

            <nav id="sidebar">
              <section className="sidebar_contents">
                <label
                  htmlFor="side_chk"
                  className="fold"
                  onClick={() =>
                    this.setState({ checked: !this.state.checked })
                  }
                >
                  <FiMenu />
                </label>
                <h1>
                  <div className="labels_container">
                    <label htmlFor="book_menu" className="book_close_label">
                      <FaBook className="book_close" />
                    </label>
                    <label htmlFor="book_menu" className="book_open_label">
                      <FaBookOpen className="book_open" />
                    </label>
                  </div>
                  <span className="logo">
                    {this.props.isMentor ? (
                      <AncLink to="/create" className="link">
                        <OverlayTrigger
                          placement="left"
                          delay={{ show: 250, hide: 400 }}
                          overlay={this.renderTooltip}
                        >
                          <AiOutlinePlusCircle className="add_module" />
                        </OverlayTrigger>
                      </AncLink>
                    ) : null}
                    <span className="modules_text" onClick={this.scrollToTop}>
                      Modules
                    </span>
                    <span className="link">
                      <AiOutlinePlusCircle className="add_module_non" />
                    </span>
                  </span>
                </h1>
                {this.props.modules.module.length ? (
                  this.props.modules.module.map((model, index) => (
                    <span>
                      <span className="models_cont_big">
                        <Link
                          className="models_cont"
                          activeClass="active_module"
                          to={model._id}
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={500}
                        >
                          {this.props.isMentor ? (
                            <AncLink
                              to="/modules/chapters/new"
                              className="link"
                            >
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
                            </AncLink>
                          ) : null}
                          <span
                            className="module_title_small"
                            onClick={event => {
                              this.handleGetModule(
                                event,
                                this.props.subject.subject._id,
                                model._id
                              );
                              this.setState({ checked: false });
                            }}
                          >
                            {model.title}
                          </span>{" "}
                          <label htmlFor="model_chk" id={index}>
                            {" "}
                            <IoIosArrowDown className="chk_chapter" />
                          </label>
                        </Link>

                        {model.chapters.length ? (
                          model.chapters.map(chapter => (
                            <span className="chapters_cont">
                              <Link
                                className="chapter_title_small"
                                activeClass="active_chapter"
                                to={chapter._id}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onClick={() => {
                                  this.getChapter(
                                    this.props.subject.subject._id,
                                    model._id,
                                    chapter._id
                                  );
                                  this.setState({ checked: false });
                                }}
                              >
                                <span>{chapter.title}</span>
                              </Link>
                            </span>
                          ))
                        ) : (
                          <span className="chapters_cont">
                            <p className="chapter_title_small_2">
                              NO Chapters created yet!
                            </p>
                          </span>
                        )}
                      </span>
                    </span>
                  ))
                ) : (
                  <li className="active">
                    <span className="chapter_title_small_2">
                      <span className="fa fa-home mr-3"></span> No Modules
                      created yet!
                    </span>
                  </li>
                )}
              </section>
            </nav>
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
    modules: modules.modules,
    chapter: modules.chapter
  };
}
export default connect(mapStatetoProps)(withRouter(Modules));
