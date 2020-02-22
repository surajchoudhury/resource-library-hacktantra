import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchModule, deleteModule } from "../Actions";
import { Modal, Button } from "react-bootstrap";

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
  return (
    <div className="main_container flex">
      <div className="topic-container">
        <div className="topic_header_container">
          <div className="topic_title">
            <span>{props.module.title}</span>
            <span>
              {props.isMentor ? (
                <div className="edit_update_container">
                  ...
                  <div className="container_edit_update">
                    <span
                      className="update_mod_container"
                      onClick={() =>
                        fetchModule(props.module.subject._id, props.module._id)
                      }
                    >
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
        {/* <hr /> */}
        {/* <div className="faq_section">
          <h3 className="faq_heading">Faqs</h3>
          <div className="faq_container">
            <h4 className="question">
              <span>1.</span> Do I need to pay any money to register for the
              Hackathon
            </h4>
            <h4 className="answer">
              <span>&#8618</span> No. You do not have to pay anything to anyone
              to register yourself for any Hackathon on HackerEarth.
            </h4>
          </div>
          <div className="faq_container">
            <h4 className="question">
              <span>1.</span> Do I need to pay any money to register for the
              Hackathon
            </h4>
            <h4 className="answer">
              <span>&#8618</span> No. You do not have to pay anything to anyone
              to register yourself for any Hackathon on HackerEarth.
            </h4>
          </div>
        </div> */}
        {DeleteModal(
          show,
          handleClose,
          handleShow,
          props.module,
          props.dispatch
        )}
      </div>
    </div>
  );
};

export default connect()(ModuleCard);
