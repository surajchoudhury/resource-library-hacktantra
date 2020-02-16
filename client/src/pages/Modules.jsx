import React from "react";
import ModulesView from "./ModulesView";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import { GoFileSubmodule } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { createModule, fetchModule } from "../Actions";
import { connect } from "react-redux";
import Loader from "../components/Loader";

class Modules extends React.Component {
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
        this.state.faq
      )
    );
  };

  handleGetModule = (event, id, moduleID) => {
    event.preventDefault();
    this.props.dispatch(fetchModule(id, moduleID));
  };

  render() {
    return (
      <main>
        {this.props.subject ? (
          <div class="wrapper d-flex align-items-stretch">
            <nav id="sidebar">
              <div class="custom-menu">
                <button
                  type="button"
                  id="sidebarCollapse"
                  class="btn btn-primary"
                >
                  <i class="fa fa-bars"></i>
                  <span class="sr-only">Toggle Menu</span>
                </button>
              </div>
              <h1>
                <a href="index.html" class="logo">
                  Modules
                </a>
              </h1>

              <ul class="list-unstyled components mb-5">
                {this.props.subject.subject.modules.length ? (
                  this.props.subject.subject.modules.map(model => (
                    <li
                      class="active"
                      onClick={event =>
                        this.handleGetModule(
                          event,
                          this.props.subject.subject._id,
                          model._id
                        )
                      }
                    >
                      <a href="">
                        <span class="fa fa-home mr-3"></span> {model.title}
                      </a>
                    </li>
                  ))
                ) : (
                  <li class="active">
                    <a href="#">
                      <span class="fa fa-home mr-3"></span> No Modules created
                      yet!
                    </a>
                  </li>
                )}
              </ul>
            </nav>

            <div id="content" class="p-4 p-md-5 pt-5">
              <Accordion>
                <Card className="my-card2">
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <GoFileSubmodule className="module_add" />
                      <IoMdAdd className="module_add" />{" "}
                      <span className="module_add_letter">
                        Add a module for {this.props.subject.subject.title}
                      </span>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Form onSubmit={this.handleCreateModule}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Title of the module"
                            name="title"
                            onChange={this.handleChange}
                          />
                          <Form.Text className="text-muted">
                            create a module that prople can read!
                          </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Description for module"
                            name="description"
                            onChange={this.handleChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Body</Form.Label>

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
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>FAQ</Form.Label>

                          <textarea
                            className="form_module-faq"
                            as="textarea"
                            rows="30"
                            name="faq"
                            onChange={this.handleChange}
                            placeholder="Write faq in Mark down"
                          ></textarea>

                          <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Create +
                        </Button>
                      </Form>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/* <h2 class="mb-4">Sidebar #04</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p> */}
              <ModulesView module={this.props.module} />
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </main>
    );
  }
}

function mapStatetoProps({ subjects, modules }) {
  return {
    subject: subjects.subject,
    module: modules.module
  };
}
export default connect(mapStatetoProps)(Modules);
