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
      <div className="card bg-dark">
        <h2 className="card-title">Add New Article</h2>

        <div className="card-body">
          <form className="newForm" onSubmit={this.handleSubmit}>

            <div className="newFormLine">

              <div className={`newTitle input-group mb-3 ${newTitleError ? 'article-invalid' : ''}`}>
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon3">Title</span>
                </div>
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

            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Article Text</span>
              </div>
              <textarea
                className={`form-control newArticleText ${newBodyError ? 'article-invalid' : ''}`}
                value={body}
                name="body"

                onChange={(event) => {
                  this.handleChange(event);
                }}

                rows="5"
                cols="50"
                wrap="soft"
              />
              {' '}

            </div>


            <div className="newArticleOptions newFormLine">
              <div className={`newArticleTopicSelect ${newTopicError ? 'article-invalid' : ''} `}>
                <TopicSelector
                  errorLabel={newTopicError ? 'topicselector-error' : ''}
                  handleTopic={this.handleTopic}
                  topics={topics}
                />
              </div>

              <button disabled={errorDetected} className={errorDetected ? 'button-disabled btn btn-info' : 'btn btn-info'} type="submit">Add New Article</button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default NewArticle;
