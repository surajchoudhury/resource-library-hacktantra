import React from "react";
import Loader from "../components/Loader";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { deleteChapter, fetchChapter } from "../Actions";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class ChaptersView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handledelete = (subid, modid, chapterID) => {
    this.props.dispatch(deleteChapter(subid, modid, chapterID));
  };

  render() {
    return (
      <main>
        {this.props.chapter ? (
          <div className="main_container flex">
            <div className="topic-container">
              <div className="topic_header_container">
                <div className="topic_title">
                  <span>{this.props.chapter.chapter.title}</span>
                  <span>
                    <div className="edit_update_container">
                      ...
                      <div className="container_edit_update">
                        <span
                          className="update_mod_container"
                          onClick={() =>
                            this.props.dispatch(
                              fetchChapter(
                                this.props.chapter.chapter.module.subject,
                                this.props.chapter.chapter.module._id,
                                this.props.chapter.chapter._id
                              )
                            )
                          }
                        >
                          <Link
                            to="/modules/chapter/update"
                            className="delete_icon_module"
                          >
                            <AiOutlineEdit className="icon-delete" /> Update
                          </Link>
                        </span>
                        <span
                          className="delete_mod_container"
                          onClick={() =>
                            this.handledelete(
                              this.props.chapter.chapter.module.subject,
                              this.props.chapter.chapter.module._id,
                              this.props.chapter.chapter._id
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
                    {this.props.chapter.chapter.description}
                  </p>
                </div>
                <div className="author_publishDate_container">
                  {/* <span className="topic_author_name">
                    {" "}
                    <b>author</b> : {this.props.module.module.author.username}
                  </span> */}
                  <span className="topic_author_name">
                    <b>publish date</b> :{" "}
                    {new Date(
                      this.props.chapter.chapter.updatedAt
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="tutorial_nav">
                <span className="nav-topic underline">Editorial</span>
                {/* <span className="nav-topic">faq</span> */}
              </div>
              <div
                className="main_tutorial_area"
                dangerouslySetInnerHTML={{
                  __html: this.props.chapter.chapter.body
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

export default connect()(withRouter(ChaptersView));
