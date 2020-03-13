import React from "react";
import { createLink } from "../Actions";
import { connect } from "react-redux";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

class CreateLink extends React.Component {
  constructor() {
    super();
    this.state = {
      body: null,
      hidden: false
    };
  }
  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch(createLink(this.props.id, this.state.body));
    this.setState({ body: "", hidden: false });
  };
  renderTooltip = props => {
    return <Tooltip {...props}>Add Link</Tooltip>;
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <OverlayTrigger
          placement="right"
          delay={{ show: 100, hide: 200 }}
          overlay={this.renderTooltip}
        >
          <AiOutlinePlusCircle
            className="add_link_icon"
            onClick={() => this.setState({ hidden: true })}
          />
        </OverlayTrigger>

        <input
          className={this.state.hidden ? "input_link" : "input_link_hidden"}
          type="text"
          name="body"
          placeholder="Link in Markdown"
          onChange={this.handleChange}
          value={this.state.body}
        />
      </form>
    );
  }
}

export default connect()(CreateLink);
