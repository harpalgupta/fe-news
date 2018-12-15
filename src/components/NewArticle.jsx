import React, { Component } from "react";
import TopicSelector from "./TopicSelector";

class NewArticle extends Component {
  state = {
    body: "",
    topic: "",
    user: {},
    selectedTopic: ""
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

            {/* <label htmlFor="topic">Topic</label>
            <input
              value={this.state.topic}
              name="topic"
              onChange={event => {
                this.handleChange(event);
              }}
            /> */}
            <TopicSelector
              handleTopic={this.handleTopic}
              topics={this.props.topics}
            />
            <button type="submit">Add New Article</button>
          </form>
        </div>
      </div>
    );
  }
  handleTopic = selectedTopic => {
    this.setState({ selectedTopic: selectedTopic });
  };
  handleChange = event => {
    //console.log(this.props.user.user_id);

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
    const newart = {
      title: this.state.title,
      body: this.state.body,
      user_id: this.props.user.user_id,
      topic: this.state.selectedTopic
    };
    let msg = "";
    for (let article_item in newart) {
      if (!newart[article_item]) {
        if (article_item === "body") msg += `Article text, `;
        else msg += `${article_item}, `;
      }
    }
    if (msg) alert(`please enter ${msg}`);

    event.preventDefault();
    this.props.handleAddArticle(newart);
  };
}

export default NewArticle;
