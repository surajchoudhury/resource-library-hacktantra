import React, { useState } from "react";
import { deleteSubject } from "../Actions";
import { Button, Modal } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { FiDelete } from "react-icons/fi";
import { setSubId, fetchSubject } from "../Actions";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { connect } from "react-redux";

const DeleteModal = (show, handleClose, handleShow, subject, dispatch) => {
  function handleConfirm() {
    dispatch(deleteSubject(subject._id));
    handleClose();
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete <em>{subject.title}</em>?
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

const SubjectCard = props => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { subject } = props;
  return (
    <div className="card card-dashboard">
      <header className="delete_btn_dashboard">
        <div className="edit_update_container">
          ...
          <div className="container_edit_update">
            <span
              className="update_mod_container"
              // onClick={() =>
              //   fetchModule(props.module.subject._id, props.module._id)
              // }
            >
              <Link to="/" className="delete_icon_module">
                <AiOutlineEdit className="icon-delete" /> Update
              </Link>
            </span>
            <span className="delete_mod_container" onClick={handleShow}>
              {" "}
              <AiOutlineDelete className="icon-delete" /> Delete
            </span>
          </div>
        </div>
      </header>
      <div className="dashboard-img-container">
        <img src={subject.image} className="card-img-top" alt="..." />
      </div>
      <div className="card-body">
        <h5 className="card-title text-center"> {subject.title}</h5>
        <p className="card-text">{subject.description}</p>
      </div>
      <a href="" className=" my-btn-dash">
        <Link
          to={`/modules/${"=" + subject._id}`}
          className="link"
          onClick={() => {
            props.dispatch(
              fetchSubject(subject._id),
              props.dispatch(setSubId(subject._id))
            );
          }}
        >
          Start Learning
        </Link>
      </a>
      {DeleteModal(show, handleClose, handleShow, subject, props.dispatch)}
    </div>
  );
};

export default connect()(SubjectCard);
