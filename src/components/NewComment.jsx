import React, { Component } from 'react';

class NewComment extends Component {
  state = {
    body: ''
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value
      },
      () => {}
    );
  };

  handleSubmit = (event) => {
    const { handleAddComment } = this.props;
    const { body } = this.state;
    event.preventDefault();
    handleAddComment(body);
  };

  render() {
    const { body } = this.state;

    return (
      <>
        <h2>Add New Comment</h2>

        <div className="comment-entry">
          <form className="newCommentForm" onSubmit={this.handleSubmit}>
            <div className="newCommentLabel">
          Comment Text
            </div>
            <div className="newCommentBody">
              <textarea
                value={body}
                name="body"
                onChange={(event) => {
                  this.handleChange(event);
                }}
              />
            </div>

            <button className="addNewCommentButton" type="submit">Add New Comment</button>
          </form>
        </div>
      </>
    );
  }
}

export default NewComment;
