import React from "react";
import { Form, Accordion, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateChapter } from "../Actions";
import Loader from "../components/Loader";

class UpdateChapter extends React.Component {
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

  componentDidMount() {
    fetch(
      `/api/v1/subjects/${this.props.chapter &&
        this.props.chapter.module.subject}/modules/${this.props.chapter &&
        this.props.chapter.module._id}/chapters/${this.props.chapter &&
        this.props.chapter._id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token
        }
      }
    )
      .then(res => res.json())
      .then(chapter => {
        if (chapter.success) {
          this.setState({
            title: chapter.MDchapter && chapter.MDchapter.title,
            description: chapter.MDchapter && chapter.MDchapter.description,
            body: chapter.MDchapter && chapter.MDchapter.body
          });
        }
      });
  }

  handleUpdate = event => {
    event.preventDefault();
    this.props.dispatch(
      updateChapter(
        this.props.chapter && this.props.chapter.module.subject,
        this.props.chapter && this.props.chapter.module._id,
        this.props.chapter && this.props.chapter._id,
        this.state.title,
        this.state.description,
        this.state.body,
        this.props.history
      )
    );
  };
  render() {
    return (
      <section className="update_form_container">
        {this.state.title ||
        this.state.description ||
        this.state.body ||
        this.state.faq ? (
          <Form onSubmit={this.handleUpdate}>
            <Form.Group controlId="formBasicEmail">
              <input
                type="text"
                placeholder="Update Title of the Chapter"
                name="title"
                className="input_title"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <input
                type="text"
                placeholder="Update Description for Chapter"
                name="description"
                className="input_desc"
                onChange={this.handleChange}
                value={this.state.description}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <textarea
                className="form_module_update"
                as="textarea"
                rows="30"
                name="body"
                onChange={this.handleChange}
                value={this.state.body}
                placeholder="Update your content in Mark down"
              ></textarea>

              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update  ✓
            </Button>
          </Form>
        ) : (
          <Loader />
        )}
      </section>
    );
  }
}

function mapStateToProps({ modules }) {
  return {
    chapter: modules.chapter && modules.chapter.chapter
  };
}

export default connect(mapStateToProps)(withRouter(UpdateChapter));
