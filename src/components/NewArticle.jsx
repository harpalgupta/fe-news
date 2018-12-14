import React, { Component } from "react";

class NewArticle extends Component {
  state = {
    body: "",
    topic: "",
    user: {}
  };
  render() {
    return (
      <div>
        <h2>Add New Article</h2>

        <div className="article-entry">
          <form className="newForm" onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              value={this.state.title}
              name="title"
              onChange={event => {
                this.handleChange(event);
              }}
            />
            <label htmlFor="body">Article Text</label>
            <input
              value={this.state.body}
              name="body"
              onChange={event => {
                this.handleChange(event);
              }}
            />

            <label htmlFor="topic">Topic</label>
            <input
              value={this.state.topic}
              name="topic"
              onChange={event => {
                this.handleChange(event);
              }}
            />
            <button type="submit">Add New Article</button>
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
      () => {
        console.log(this.state);
      }
    );
  };
  handleSubmit = event => {
    const newart = {
      title: this.state.title,
      body: this.state.body,
      user_id: this.props.user.user_id,
      topic: this.state.topic
    };
    event.preventDefault();
    this.props.handleAddArticle(newart);
  };
}

export default NewArticle;
