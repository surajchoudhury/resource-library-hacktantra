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
          <section
            className={
              this.props.isMentor
                ? "container-dashboard-big"
                : "container-dashboard-big-user"
            }
          >
            <section
              className={
                this.props.isMentor
                  ? "container-dashboard"
                  : "container-dashboard-user"
              }
            >
              {this.props.subjects.map((subject, i) => (
                <SubjectCard
                  subject={subject}
                  isMentor={this.props.isMentor}
                  collection={i}
                />
              ))}
            </section>
            {this.props.isMentor ? (
              <section className="section2_container">
                <Accordion defaultActiveKey="0" className="according_container">
                  <Card className="shadow-sm rounded border my-card_container">
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        <GiWhiteBook className="add_subject" />
                        <IoMdAdd className="add_subject" />
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <Form onSubmit={this.handleCreate}>
                          <input
                            autoComplete="off"
                            className=" rounded input-subject-title"
                            type="text"
                            placeholder="Title"
                            name="title"
                            onChange={this.handleChange}
                          />

                          <textarea
                            autoComplete="off"
                            name="description"
                            className="rounded input-subject-description"
                            onChange={this.handleChange}
                            placeholder="Add a short description"
                          />

                          <input
                            className="rounded input-subject-img"
                            type="url"
                            placeholder="Image URL"
                            name="image"
                            onChange={this.handleChange}
                          />

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
