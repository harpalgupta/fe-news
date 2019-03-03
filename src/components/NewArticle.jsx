import React, { Component } from 'react';
import TopicSelector from './TopicSelector';

class NewArticle extends Component {
  state = {
    body: '',
    selectedTopic: '',
    title: ''
  };

  handleTopic = (selectedTopic) => {
    this.setState({ selectedTopic });
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
    const { title, body, selectedTopic } = this.state;
    const { user, handleAddArticle } = this.props;
    const newart = {
      title,
      body,
      user_id: user.user_id,
      topic: selectedTopic
    };
    let msg = '';

    Object.keys(newart).forEach((article_item) => {
      if (!newart[article_item]) {
        if (article_item === 'body') msg += 'Article text, ';
        else msg += `${article_item}, `;
      }
    });


    if (msg) alert(`please enter ${msg}`);

    event.preventDefault();
    handleAddArticle(newart, user.username || JSON.parse(sessionStorage.user));
  };

  render() {
    const { title, body } = this.state;
    const { topics } = this.props;

    return (
      <div>
        <h2>Add New Article</h2>

        <div className="article-entry">
          <form className="newForm" onSubmit={this.handleSubmit}>
            <div>
              <div className="newFormLine">
                <div>
                  <label htmlFor="title">Title</label>

                </div>

                <input
                  value={title}
                  name="title"
                  onChange={(event) => {
                    this.handleChange(event);
                  }}
                />

              </div>
              <div className="newFormLine">
                <div>
                  <label htmlFor="body">Article Text</label>


                </div>
                <textarea
                  className="newArticleText"
                  value={body}
                  name="body"
                  onChange={(event) => {
                    this.handleChange(event);
                  }}
                  rows="5"
                  cols="50"
                  wrap="soft"
                />
              </div>

              {/* <label htmlFor="topic">Topic</label>
            <input
              value={this.state.topic}
              name="topic"
              onChange={event => {
                this.handleChange(event);
              }}
            /> */}
              <div className="newArticleOptions">
                <div className="newArticleTopicSelect">

                  <TopicSelector
                    handleTopic={this.handleTopic}
                    topics={topics}
                  />
                </div>

                <button className="newArticleSubmitButton" type="submit">Add New Article</button>
              </div>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewArticle;
