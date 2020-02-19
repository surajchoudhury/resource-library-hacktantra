import React from "react";
import Loader from "../components/Loader";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { fetchModule, deleteModule } from "../Actions";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class ModulesView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handledelete = (id, moduleID) => {
    this.props.dispatch(deleteModule(id, moduleID));
  };

  render() {
    return (
      <main>
        {this.props.module ? (
          <div className="main_container flex">
            <div className="topic-container">
              <div className="topic_header_container">
                <div className="topic_title">
                  <span>{this.props.module.module.title}</span>
                  <span>
                    <div className="edit_update_container">
                      ...
                      <div className="container_edit_update">
                        <span
                          className="update_mod_container"
                          onClick={() =>
                            fetchModule(
                              this.props.module.module.subject._id,
                              this.props.module.module._id
                            )
                          }
                        >
                          <Link to="/update" className="delete_icon_module">
                            <AiOutlineEdit className="icon-delete" /> Update
                          </Link>
                        </span>
                        <span
                          className="delete_mod_container"
                          onClick={() =>
                            this.handledelete(
                              this.props.module.module.subject._id,
                              this.props.module.module._id
                            )
                          }
                        >
                          {" "}
                          <AiOutlineDelete className="icon-delete" /> Delete
                        </span>
                      </div>
                    </div>{" "}
                  </span>
                </div>
                <div>
                  <span className="short_decreption">
                    <b>description:</b>
                  </span>
                  <p className="short_decreption">
                    {this.props.module.module.description}
                  </p>
                </div>
                <div className="author_publishDate_container">
                  <span className="topic_author_name">
                    {" "}
                    <b>author</b> : {this.props.module.module.author.username}
                  </span>
                  <span className="topic_author_name">
                    <b>publish date</b> :{" "}
                    {new Date(
                      this.props.module.module.updatedAt
                    ).toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <div className="tutorial_nav">
                <span className="nav-topic underline">Editorial</span>
                <span className="nav-topic">faq</span>
              </div>
              <div
                className="main_tutorial_area"
                dangerouslySetInnerHTML={{
                  __html: this.props.module.module.body
                }}
              ></div>
              <hr />
              <div className="faq_section">
                <h3 className="faq_heading">Faqs</h3>
                <div className="faq_container">
                  <h4 className="question">
                    <span>1.</span> Do I need to pay any money to register for
                    the Hackathon
                  </h4>
                  <h4 className="answer">
                    <span>&#8618</span> No. You do not have to pay anything to
                    anyone to register yourself for any Hackathon on
                    HackerEarth.
                  </h4>
                </div>
                <div className="faq_container">
                  <h4 className="question">
                    <span>1.</span> Do I need to pay any money to register for
                    the Hackathon
                  </h4>
                  <h4 className="answer">
                    <span>&#8618</span> No. You do not have to pay anything to
                    anyone to register yourself for any Hackathon on
                    HackerEarth.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </main>
    );
  }
}

export default connect()(withRouter(ModulesView));
