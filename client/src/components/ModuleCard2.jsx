import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchModule, deleteModule } from "../Actions";
import { Modal, Button } from "react-bootstrap";
import ChapterCard2 from "./ChapterCard2";
import Loader from "./Loader";

const DeleteModal = (show, handleClose, handleShow, module, dispatch) => {
  function handleConfirm() {
    dispatch(deleteModule(module.subject._id, module._id));
    handleClose();
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete <em>{module.title}</em>?
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

const ModuleCard = props => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let { dispatch } = props;
  return (
    <div className="main_container " id={props.module._id}>
      <div className="topic-container">
        <div className="topic_header_container">
          <div className="topic_title">
            <span className="topic_title_small">{props.module.title}</span>
            <span>
              {props.isMentor ? (
                <div
                  className="edit_update_container"
                  onMouseOver={() =>
                    dispatch(
                      fetchModule(props.module.subject._id, props.module._id)
                    )
                  }
                >
                  ...
                  <div className="container_edit_update">
                    <span className="update_mod_container">
                      <Link to="/update" className="delete_icon_module">
                        <AiOutlineEdit className="icon-delete" /> Update
                      </Link>
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
            <p className="short_decreption">{props.module.description}</p>
          </div>
          <div className="author_publishDate_container">
            <span className="topic_author_name">
              {" "}
              <b>author</b> : {props.module.author.username}
            </span>
            <span className="topic_author_name">
              <b>publish date</b> :{" "}
              {new Date(props.module.createdAt).toDateString()}
            </span>
            <span className="topic_author_name">
              <b>Updated on</b> :{" "}
              {new Date(props.module.updatedAt).toDateString()}
            </span>
          </div>
        </div>
        <div className="tutorial_nav">
          <span className="nav-topic underline">Article</span>
          {/* <span className="nav-topic">faq</span> */}
        </div>
        <div
          className="main_tutorial_area"
          dangerouslySetInnerHTML={{
            __html: props.module.body
          }}
        ></div>
        {DeleteModal(
          show,
          handleClose,
          handleShow,
          props.module,
          props.dispatch
        )}
      </div>

      {props.module.chapters ? (
        props.module.chapters.map(chapter => (
          <ChapterCard2 {...chapter} isMentor={props.isMentor} />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default connect()(ModuleCard);
