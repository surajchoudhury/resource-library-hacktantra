import React from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";

const renderTooltip = props => {
  return <Tooltip {...props}>Add Quick Links</Tooltip>;
};

const Links = (props) => {
  return <span className="logo_urls">
    {props.isMentor ? (
      <Link to="/create" className="link">
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <AiOutlinePlusCircle className="add_module" />
        </OverlayTrigger>
      </Link>
    ) : null}
    <span
      className="modules_text links_text"
    >
      Quick Links
    </span>
    <span className="link">
      <AiOutlinePlusCircle className="add_module_non" />
    </span>
  </span>;
};

export default Links;
