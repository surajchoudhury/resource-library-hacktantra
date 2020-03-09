import React from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { createUrl } from "../Actions";

class CreateUrl extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      body: null,
      submit: false
    };
  }
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleCreate = event => {
    event.preventDefault();
    this.props.dispatch(
      createUrl(this.state.title, this.state.body, this.props.history)
    );
  };

  handleBtn = () => {
    if (this.state.title && this.state.body) {
      this.setState({ submit: true });
    } else {
      this.setState({ submit: false });
    }
  };

  render() {
    return (
      <section className="update_form_container">
        <Form onSubmit={this.handleCreate}>
          <Form.Group controlId="formBasicEmail">
            <input
              type="text"
              placeholder=" Title of the URL"
              name="title"
              className="input_title_url"
              onChange={this.handleChange}
              value={this.state.title}
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
              placeholder="Write your content in Mark down"
            ></textarea>

            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleBtn}>
            {this.state.submit ? "Creating..." : "Create"}
          </Button>
        </Form>
      </section>
    );
  }
}

export default connect()(withRouter(CreateUrl));
