import React from "react";
import { Form, Button } from "react-bootstrap";
import { GoFileSubmodule } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { createChapter } from "../Actions";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import { withRouter } from "react-router-dom";

class CreateChapter extends React.Component {
  constructor() {
    super();

    this.state = {
      title: null,
      description: null,
      body: null,
      submit: false
    };
  }
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleCreateChapter = event => {
    event.preventDefault();
    this.props.dispatch(
      createChapter(
        this.props.subject.subject._id,
        this.props.module._id,
        this.state.title,
        this.state.description,
        this.state.body,
        this.props.history
      )
    );
  };

  handleBtn = () => {
    if (this.state.title && this.state.description && this.state.body) {
      this.setState({ submit: true });
    } else {
      this.setState({ submit: false });
    }
  };

  render() {
    return (
      <>
        {this.props.module ? (
          <div className="update_form_container">
            {/* <Accordion> */}
              {/* <Card.Body> */}
                <Form onSubmit={this.handleCreateChapter}>
                  <Form.Group controlId="formBasicEmail">
                    <input
                      type="text"
                      placeholder="Enter title of the Chapter"
                      name="title"
                      className="input_title"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <input
                      type="text"
                      placeholder="Enter Description for Chapter"
                      name="description"
                      className="input_desc"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <textarea
                      className="form_module"
                      as="textarea"
                      rows="30"
                      name="body"
                      onChange={this.handleChange}
                      placeholder="Write your content in Mark down"
                    ></textarea>

                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleBtn}
                  >
                    {this.state.submit ? "Creating..." : "Create"}
                  </Button>
                </Form>
              {/* </Card.Body> */}
            {/* </Accordion> */}
          </div>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

function mapStateToProps({ subjects, modules }) {
  return {
    subject: subjects.subject,
    module: modules.module && modules.module.MDmodule
  };
}

export default connect(mapStateToProps)(withRouter(CreateChapter));
