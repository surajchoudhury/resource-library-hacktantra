import React, { useState } from "react";
import { deleteSubject } from "../Actions";
import { Button, Modal } from "react-bootstrap";
import { Link} from "react-router-dom";
import { setSubId, fetchSubject } from "../Actions";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { connect } from "react-redux";

const getModel = (subject, dispatch) => {
  dispatch(fetchSubject(subject._id));
  dispatch(setSubId(subject._id));

};

const DeleteModal = (show, handleClose, subject, dispatch) => {
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
    <section className="shadow-sm rounded border card-dashboard">
      <div className="subject-img-container">
        <img src={subject.image} className="subject-img" alt="" />
      </div>
      <div className="subject-content-container">
        {props.isMentor ? (
          <div className="edit_update_container">
            ...
            <div className="container_edit_update">
              <span className="delete_mod_container" onClick={handleShow}>
                <AiOutlineDelete className="icon-delete" /> Delete
              </span>
            </div>
          </div>
        ) : null}
        <div className="collection_container">
          <p className="collection_name">collection</p>
          <p className="collection_no">
            {props.collection < 10 ? 0 : null}
            {props.collection + 1}
          </p>
        </div>
        <Link
          to={`/modules/${"=" + subject._id}`}
          className="link"
          onClick={() => getModel(subject, props.dispatch)}
        >
          <p className="subject_title">{subject.title}</p>
        </Link>
        <p className="subject_description">{subject.description}</p>
        <p className="collection_name">modules</p>
        <p>
          {subject.modules.length < 10 ? 0 : null}
          {subject.modules.length}
        </p>
      </div>
      {DeleteModal(show, handleClose, subject, props.dispatch)}
    </section>
  );
};

export default connect()(SubjectCard);
