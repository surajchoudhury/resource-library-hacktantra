import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { TiDeleteOutline } from "react-icons/ti";
import { connect } from "react-redux";
import { deleteLink } from "../Actions";

const renderTooltip = props => {
  return <Tooltip {...props}>{`Delete Link`}</Tooltip>;
};

const handleDelete = (id, linkId, dispatch) => {
  dispatch(deleteLink(id, linkId));
};

const Link = props => {
  return (
    <section className="link_container">
      <div
        className="links_body"
        dangerouslySetInnerHTML={{
          __html: props.body
        }}
      ></div>
      {props.isMentor ? (
        <OverlayTrigger
          placement="left"
          delay={{ show: 100, hide: 200 }}
          overlay={renderTooltip(props)}
        >
          <TiDeleteOutline
            className="delete_link"
            onClick={() => handleDelete(props.urlId, props._id, props.dispatch)}
          />
        </OverlayTrigger>
      ) : null}
    </section>
  );
};

export default connect()(Link);
