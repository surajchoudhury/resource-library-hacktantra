import React, { useState } from "react";
import Loader from "../components/Loader";
import { deleteChapter, fetchChapter } from "../Actions";
import { withRouter } from "react-router-dom";
import Prism from "prismjs";
import { connect } from "react-redux";
import ChapterCard from "../components/ChapterCard";

class ChaptersView extends React.Component {
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

  handledelete = (subid, modid, chapterID) => {
    this.props.dispatch(deleteChapter(subid, modid, chapterID));
  };

  render() {
    return (
      <main>
        {this.props.chapter ? (
          <ChapterCard
            chapter={this.props.chapter.chapter}
            isMentor={this.props.isMentor}
          />
        ) : (
          <Loader />
        )}
      </main>
    );
  }
}

export default connect()(withRouter(ChaptersView));
