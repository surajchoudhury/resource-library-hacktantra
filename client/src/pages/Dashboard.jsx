import React from "react";
import { connect } from "react-redux";
import { fetchSubjects, createSubject, deleteSubject } from "../Actions";
import { Accordion, Card, Button, Form } from "react-bootstrap";
import { GiWhiteBook } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";
import { FaBookOpen } from "react-icons/fa";
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
    let { subjects, user } = this.props;
    return (
      <>
        {subjects && user && user.success ? (
          <section className={"container-dashboard-big"}>
            <section className={"container-dashboard"}>
              {this.props.subjects.map((subject, i) => (
                <SubjectCard
                  subject={subject}
                  isMentor={this.props.isMentor}
                  collection={i}
                />
              ))}
            </section>
            <section>
              {this.props.isMentor ? (
                <section className="section2_container">
                  <Accordion
                    defaultActiveKey="0"
                    className="according_container"
                  >
                    <Card className="shadow-sm rounded border my-card_container">
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="1"
                        >
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
              <div className="dashboard_right_content ">
                <div className="dashboard_right_content_small">
                  <p className="resource_dashboard">
                    <FaBookOpen className="book_dashboard" /> resource library
                  </p>
                  <p className="username_dashboard">
                    {`Welcome @${user.user.username + "!"}`}
                    <br />
                    <span className="resource_ex">
                      Resource Library is optimized for learning, Examples might
                      be simplified to improve reading and basic understanding.
                      <br />
                      <Link to="/urls" className="links_btn">
                        Resources for developers, by developers
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </section>
          </section>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

function mapStatetoProps({ subjects: { subjects }, users: { user } }) {
  return {
    subjects: subjects && subjects.subjects,
    user
  };
}

export default connect(mapStatetoProps)(withRouter(Dashboard));
