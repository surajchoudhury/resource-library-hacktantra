import React, { useState } from "react";
import { fetchSubjects, createSubject, deleteSubject } from "../Actions";
import { Accordion, Card, Button, Form, Modal } from "react-bootstrap";
import { GiWhiteBook } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";
import { Link, withRouter } from "react-router-dom";
import { FiDelete } from "react-icons/fi";
import Loader from "./Loader";
import { setSubId, fetchSubject } from "../Actions";
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
          <Button
            variant="primary"
            onClick={() => handleConfirm()}
          >
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
        <FiDelete
          className="delete_btn"
          // onClick={() => props.dispatch(deleteSubject(subject._id))}
          onClick={handleShow}
        />
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
