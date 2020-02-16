import React from "react";
import { Spinner, ButtonToolbar, Button } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="loader_container">
      <Spinner animation="border" role="status" className="my-spinner">
        <span className="sr-only">Loading...</span>
      </Spinner>{" "}
      <span className="loading">Loading...</span>
    </div>
  );
};

export default Loader;
