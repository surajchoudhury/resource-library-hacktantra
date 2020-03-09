import React, { useState } from "react";
import { fetchChapter, deleteChapter } from "../Actions";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link as AncLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";

const DeleteModal = (show, handleClose, handleShow, chapter, dispatch) => {
  function handleConfirm() {
    dispatch(
      deleteChapter(chapter.module.subject, chapter.module._id, chapter._id)
    );
    handleClose();
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Chapter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete <em>{chapter.title}</em>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirm()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const ChapterCard = props => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let { dispatch } = props;
  return (
    <div className="main_container" id={props._id}>
      <div className="topic-container">
        <div className="topic_header_container">
          <div className="topic_title">
            <span className="topic_title_small">{props.title}</span>
            <span>
              {props.isMentor ? (
                <div
                  className="edit_update_container"
                  onMouseOver={() =>
                    dispatch(
                      fetchChapter(
                        props.module.subject,
                        props.module._id,
                        props._id
                      )
                    )
                  }
                >
                  ...
                  <div className="container_edit_update">
                    <span className="update_mod_container">
                      <AncLink
                        to="/modules/chapter/update"
                        className="delete_icon_module"
                      >
                        <AiOutlineEdit className="icon-delete" /> Update
                      </AncLink>
                    </span>
                    <span className="delete_mod_container" onClick={handleShow}>
                      {" "}
                      <AiOutlineDelete className="icon-delete" /> Delete
                    </span>
                  </div>
                </div>
              ) : null}
            </span>
          </div>
          <div>
            <span className="short_decreption">
              <b>description:</b>
            </span>
            <p className="short_decreption">{props.description}</p>
          </div>
          <div className="author_publishDate_container">
            <span className="topic_author_name">
              <b>publish date</b> : {new Date(props.createdAt).toDateString()}
            </span>
            <span className="topic_author_name">
              <b>Updated on</b> : {new Date(props.updatedAt).toDateString()}
            </span>
          </div>
        </div>
        <div className="tutorial_nav">
          <span className="nav-topic underline">Article</span>
        </div>
        <div
          className="main_tutorial_area"
          dangerouslySetInnerHTML={{
            __html: props.body
          }}
        ></div>
        {DeleteModal(show, handleClose, handleShow, props, dispatch)}
      </div>
    </div>
  );
};

export default connect()(ChapterCard);
