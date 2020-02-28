import React from "react";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import { GoFileSubmodule } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { createModule, fetchModule } from "../Actions";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import { withRouter } from "react-router-dom";
class CreateModule extends React.Component {
  constructor() {
    super();

    this.state = {
      title: null,
      description: null,
      body: null,
      faq: null
    };
  }
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleCreateModule = event => {
    event.preventDefault();
    this.props.dispatch(
      createModule(
        this.props.subject.subject._id,
        this.state.title,
        this.state.description,
        this.state.body,
        this.state.faq,
        this.props.history
      )
    );
  };

  render() {
    return (
      <>
        {this.props.subject ? (
          <div id="content">
            <Accordion>
              <Card.Body>
                <Form onSubmit={this.handleCreateModule}>
                  <Form.Group controlId="formBasicEmail">
                    <input
                      type="text"
                      placeholder="Enter Title of the module"
                      name="title"
                      className="input_title"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <textarea
                      type="text"
                      placeholder="Enter Description for module"
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
                  {/* <Form.Group controlId="formBasicEmail">
                    <textarea
                      className="form_module-faq"
                      as="textarea"
                      rows="30"
                      name="faq"
                      onChange={this.handleChange}
                      placeholder="Write faq in Mark down"
                    ></textarea>

                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group> */}
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

function mapStateToProps({ subjects }) {
  return {
    subject: subjects.subject
  };
}

export default connect(mapStateToProps)(withRouter(CreateModule));
