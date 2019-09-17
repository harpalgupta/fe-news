import React, { Component } from 'react';
import TopicSelector from './TopicSelector';
import './NewArticle.css';
// import { addNewArticle } from '../api';

class NewArticle extends Component {
  state = {
    body: '',
    selectedTopic: '',
    title: '',
    errorDetected: true,
    newTitleError: true,
    newBodyError: true,
    newTopicError: true,

  };

  handleReset = () => {
    this.setState(
      {
        body: '',
        selectedTopic: '',
        title: ''
      }
    );
  }


  handleTopic = (selectedTopic) => {
    this.setState({ selectedTopic }, () => { this.verifySubmit(); });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value
      },
      () => { this.verifySubmit(); }
    );
  };

  verifySubmit = () => {
    const {
      title, selectedTopic, body,
    } = this.state;
    // console.log('verifying', selectedTopic);

    if (title) this.setState({ newTitleError: false });
    else this.setState({ newTitleError: true }, () => this.checkError());

    if (body) {
      this.setState({ newBodyError: false }, () => this.checkError());
    } else this.setState({ newBodyError: true }, () => this.checkError());

    if (selectedTopic === '') {
      this.setState({ newTopicError: true }, () => this.checkError());
    } else this.setState({ newTopicError: false });

    this.checkError();

    return null;
  }

  checkError = () => {
    const {
      newTopicError, newBodyError, newTitleError
    } = this.state;
    // console.log('in check error', this.state);
    if (newTitleError || newBodyError || newTopicError) {
      this.setState({ errorDetected: true });
    } else this.setState({ errorDetected: false });

    return false;
  }

  handleSubmit = (event) => {
    const {
      title, body, selectedTopic
    } = this.state;
    const { user, handleAddArticle } = this.props;
    const newart = {
      title,
      body,
      user_id: user.user_id,
      topic: selectedTopic,
    };


    handleAddArticle(newart, user.username || JSON.parse(sessionStorage.user));
    this.handleReset();


    event.preventDefault();
  };

  render() {
    const {
      title, body, newTitleError, newBodyError, newTopicError, errorDetected
    } = this.state;
    const { topics } = this.props;

    return (
      <div>
        <h2>Add New Article</h2>

        <div className="article-entry">
          <form className="newForm" onSubmit={this.handleSubmit}>

            <div className="newFormLine">
              <h3>Title</h3>
              <div className={`newTitle ${newTitleError ? 'article-invalid' : ''}`}>
                <input
                  value={title}
                  name="title"
                  onFocus={(event) => {
                    this.handleChange(event);
                  }}
                  onBlur={(event) => {
                    this.handleChange(event);
                  }}
                  onChange={(event) => {
                    this.handleChange(event);
                  }}
                />
              </div>

            </div>


            <h3>Article Text</h3>

            <div>
              <textarea
                className={`newArticleText ${newBodyError ? 'article-invalid' : ''}`}
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


            <div className="newArticleOptions newFormLine">
              <div className={`newArticleTopicSelect ${newTopicError ? 'article-invalid' : ''} `}>
                <h3>Topic</h3>


                <TopicSelector
                  errorLabel={newTopicError ? 'topicselector-error' : ''}
                  handleTopic={this.handleTopic}
                  topics={topics}

                />
              </div>

              <button disabled={errorDetected} className={errorDetected ? 'button-disabled newArticleSubmitButton' : 'newArticleSubmitButton'} type="submit">Add New Article</button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default NewArticle;
