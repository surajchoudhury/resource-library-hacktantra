import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { fetchModule } from "../Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SidebarModule extends React.Component {
  constructor() {
    super();
    this.state = {
      current: null
    };
  }
  render() {
    let { model, index } = this.props;
    return (
      <span>
        <span className="models_cont_big">
          <input
            type="checkbox"
            name=""
            id="model_chk"
            checked={ this.props.current === String(index) ? true : false }
          />
          <div className="models_cont">
            <label htmlFor="model_chk" id={index}>
              {" "}
              <IoIosArrowDown
                className="chk_chapter"
                onClick={() => {
                  this.setState({ current: index });
                }}
              />
            </label>
            <span
              className="active"
              onClick={event => {
                this.props.handleGetModule(
                  event,
                  this.props.subject.subject._id,
                  model._id
                );
                this.props.toggle();
              }}
            >
              {model.title}
              {index}
            </span>
            {this.props.isMentor ? (
              <Link to="/modules/chapters/new" className="link">
                <AiOutlinePlusCircle
                  className="add_module"
                  onClick={() => {
                    this.props.dispatch(
                      fetchModule(this.props.subject.subject._id, model._id)
                    );
                  }}
                />
                <span className="add_mod">Add a Chapter</span>
              </Link>
            ) : (
              <span className="link">
                <AiOutlinePlusCircle className="add_module_non" />
              </span>
            )}
          </div>

          {model.chapters.length ? (
            model.chapters.map(chapter => (
              <span className="chapters_cont">
                <p
                  className="chapter_title_small"
                  onClick={() => {
                    this.props.getChapter(
                      this.props.subject.subject._id,
                      model._id,
                      chapter._id
                    );
                    this.props.toggle();
                  }}
                >
                  {chapter.title}
                </p>
              </span>
            ))
          ) : (
            <span className="chapters_cont">
              <p className="chapter_title_small_2">NO Chapters created yet!</p>
            </span>
          )}
        </span>
      </span>
    );
  }
}

export default connect()(SidebarModule);
