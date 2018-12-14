import React, { Component } from "react";

class NewComment extends Component {
  state = {
    body: ""
  };
  render() {
    return (
      <div>
        <h2>Add New Commment</h2>

        <div className="comment-entry">
          <form className="newForm" onSubmit={this.handleSubmit}>
            <input
              value={this.state.body}
              name="body"
              onChange={event => {
                this.handleChange(event);
              }}
            />
            <button type="submit">Add New Comment</button>
          </form>
        </div>
      </div>
    );
  }
  handleChange = event => {
    console.log("in handle change");
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value
      },
      () => {}
    );
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.handleAddComment(this.state.body);
  };
}

export default NewComment;
