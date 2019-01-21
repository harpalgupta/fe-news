import React, { Component } from "react";

class NewComment extends Component {
  state = {
    body: ""
  };
  render() {
    return (
      <div>
        <h2>Add New Comment</h2>

        <div className="comment-entry">
          <form className="newCommentForm" onSubmit={this.handleSubmit}>
          <div className="newCommentLabel">
          Comment Text
          </div>
           <div className="newCommentBody">
           <textarea
              value={this.state.body}
              name="body"
              onChange={event => {
                this.handleChange(event);
              }}

            />
           </div>
            
            <button class="addNewCommentButton" type="submit">Add New Comment</button>
          </form>
        </div>
      </div>
    );
  }
  handleChange = event => {
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
