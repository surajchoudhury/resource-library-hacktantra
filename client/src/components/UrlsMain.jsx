import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Links from "./Link";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { setUrlId, deleteUrl } from "../Actions";
import CreateLink from "./CreateLink";

const DeleteModal = (show, handleClose, handleShow, url, dispatch) => {
  function handleConfirm() {
    dispatch(deleteUrl(url._id));
    handleClose();
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Chapter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete <em>{url.title}</em>?
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

const UrlsMain = props => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let {
    dispatch,
    isMentor,
    title,
    body,
    _id,
    createdAt,
    updatedAt,
    author,
    links
  } = props;
  return (
    <main className="main_container " id={_id}>
      <div className="topic-container">
        <div className="topic_title_url">
          <span className="url_title_small">{title}</span>
          <span>
            {props.isMentor ? (
              <div
                className="edit_update_container"
                onMouseOver={() => dispatch(setUrlId(_id))}
              >
                ...
                <div className="container_edit_update">
                  <span className="update_mod_container">
                    <Link to="/urls/update" className="delete_icon_module">
                      <AiOutlineEdit className="icon-delete" /> Update
                    </Link>
                  </span>
                  <span className="delete_mod_container" onClick={handleShow}>
                    <AiOutlineDelete className="icon-delete" /> Delete
                  </span>
                </div>
              </div>
            ) : null}
          </span>
        </div>
        <div className="author_publishDate_container">
          <span className="topic_author_name">
            {" "}
            <b>author</b> : {author.username}
          </span>
          <span className="topic_author_name">
            <b>publish date</b> : {new Date(createdAt).toDateString()}
          </span>
          <span className="topic_author_name">
            <b>Updated on</b> : {new Date(updatedAt).toDateString()}
          </span>
        </div>

        <article
          dangerouslySetInnerHTML={{
            __html: body
          }}
        ></article>
        {DeleteModal(show, handleClose, handleShow, props, dispatch)}

        {links.map(link => (
          <Links {...link} urlId={_id} isMentor={isMentor} />
        ))}
        {isMentor ? <CreateLink id={_id} /> : null}
      </div>
    </main>
  );
};

export default connect()(UrlsMain);
