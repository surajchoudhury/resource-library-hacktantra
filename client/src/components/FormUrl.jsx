import React from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { updateUrl } from "../Actions";
import Loader from "../components/Loader";

class FormUrl extends React.Component {
  constructor() {
    super();
    this.state = {
      updating: false,
      id: null,
      title: null,
      body: null,
      submit: false
    };
  }
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  componentDidMount() {
    fetch(`/api/v1/url/${this.props.urlId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(url => {
        if (url.success) {
          this.setState({
            updating: true,
            title: url.url && url.url.title,
            body: url.url && url.url.body,
            id: url.url && url.url._id
          });
        }
      });
  }

  handleUpdate = event => {
    event.preventDefault();
    this.props.dispatch(
      updateUrl(
        this.state.id,
        this.state.title,
        this.state.body,
        this.props.history
      )
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
        {this.state.updating ? (
          <Form onSubmit={this.handleUpdate}>
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
              {this.state.submit ? "Updating..." : "Update"}
            </Button>
          </Form>
        ) : (
          <Loader />
        )}
      </section>
    );
  }
}
function mapStateToProps({ urls: { urlId } }) {
  return {
    urlId
  };
}

export default connect(mapStateToProps)(withRouter(FormUrl));
