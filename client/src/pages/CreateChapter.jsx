import React from "react";
import { Accordion, Card, Form, Button } from "react-bootstrap";
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
      body: null
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

  render() {
    return (
      <>
        {this.props.module ? (
          <div id="content">
            <Accordion>
              <Card.Body>
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
                    <textarea
                      type="text"
                      placeholder="Enter Description for Chapter"
                      name="description"
                      className="textarea_desc"
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

                  <Button variant="primary" type="submit">
                    Create +
                  </Button>
                </Form>
              </Card.Body>
            </Accordion>
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
