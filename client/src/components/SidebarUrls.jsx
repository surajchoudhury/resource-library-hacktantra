import React from "react";
import { Link } from "react-scroll";

const SidebarUrls = props => {
  return (
    <aside className="aside_urls">
      <Link
        className="aside_urls_title"
        activeClass="active_urls"
        to={props._id}
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <p className="url_title_sidebar" onClick={props.handleCheck}>
          {props.title}
        </p>
      </Link>
    </aside>
  );
};

export default SidebarUrls;
