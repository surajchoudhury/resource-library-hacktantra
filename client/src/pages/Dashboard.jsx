import React from "react";
import { connect } from "react-redux";
import { fetchSubjects, createSubject, deleteSubject } from "../Actions";
import { Accordion, Card, Button, Form } from "react-bootstrap";
import { GiWhiteBook } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";
import { Link, withRouter } from "react-router-dom";
import Loader from "../components/Loader";
import SubjectCard from "../components/SubjectCard";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      description: null,
      image: null
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchSubjects());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleCreate = event => {
    event.preventDefault();
    this.props.dispatch(
      createSubject(
        this.state.title,
        this.state.description,
        this.state.image,
        this.props.history
      )
    );
  };
  s;

  render() {
    return (
      <>
        {this.props.subjects ? (
          <section className="container-dashboard-big">
            <section className="container-dashboard">
              {this.props.subjects.map(subject => (
                <SubjectCard subject={subject} />
              ))}
            </section>
            {this.props.isMentor ? (
              <section className="section2_container">
                <Accordion defaultActiveKey="0" className="according_container">
                  <Card className="my-card_container">
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        <GiWhiteBook className="add_subject" />
                        <IoMdAdd className="add_subject" />
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <Form onSubmit={this.handleCreate}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>Add a title</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter a title"
                              name="title"
                              onChange={this.handleChange}
                            />
                            <Form.Text className="text-muted">
                              We'll never share your email with anyone else.
                            </Form.Text>
                          </Form.Group>

                          <Form.Group controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows="3"
                              name="description"
                              onChange={this.handleChange}
                              placeholder="Add a short description"
                            />
                          </Form.Group>

                          <Form.Group controlId="formBasicPassword">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="image"
                              name="image"
                              onChange={this.handleChange}
                            />
                          </Form.Group>

                          <Button variant="primary" type="submit">
                            Create +
                          </Button>
                        </Form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </section>
            ) : null}
          </section>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

function mapStatetoProps({ subjects }) {
  return {
    subjects: subjects.subjects && subjects.subjects.subjects
  };
}

export default connect(mapStatetoProps)(withRouter(Dashboard));
