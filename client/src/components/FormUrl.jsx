import React from "react";

class FormUrl extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      body: null
    };
  }
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  componentDidMount() {
    fetch(`/api/v1/url/${id}`, {
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
            title: url.MDurl && url.MDurl.title,
            body: url.MDurl && url.MDurl.body
          });
        }
      });
  }
  render() {
    return <p></p>;
  }
}

export default FormUrl;
