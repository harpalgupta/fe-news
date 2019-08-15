import React, { Component } from 'react';
import TopicSelector from './TopicSelector';
import './NewArticle.css';
// import { addNewArticle } from '../api';

class NewArticle extends Component {
  state = {
    body: '',
    selectedTopic: '',
    title: '',
    newArticleError: [],
    errorDetected: true,
    newTitleError: true,
    newBodyError: true,
    newTopicError: true,

  };

  handleReset = ()=>{
    this.setState(
      {
        body:'',
        selectedTopic:'',
        title:''
    })
  }


  handleTopic = (selectedTopic) => {
    this.setState({ selectedTopic }, () => { this.verifySubmit(); console.log('HIIII', this.state.selectedTopic, 'bl'); });
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
    console.log('verifying', selectedTopic);

    if (title) this.setState({ newTitleError: false });
    else this.setState({ newTitleError: true }, () => this.checkError());

    if (body) {
      this.setState({ newBodyError: false }, () => this.checkError());
    } else this.setState({ newBodyError: true }, () => this.checkError());

    if (selectedTopic === '') {
      console.log('BLAH');
      this.setState({ newTopicError: true }, () => this.checkError());
    } else this.setState({ newTopicError: false });

    this.checkError();

    return null;
  }

  checkError =() => {
    const {
       newTopicError, newBodyError, newTitleError, errorDetected
    } = this.state;
    console.log('in check error', this.state);
    if (newTitleError || newBodyError || newTopicError) {
      this.setState({ errorDetected: true }, () => console.log('errorDetected', errorDetected));
    } else this.setState({ errorDetected: false }, () => console.log('errorDetected', errorDetected));

    return false;
  }

  handleSubmit = (event) => {
    const { title, body, selectedTopic } = this.state;
    const { user, handleAddArticle } = this.props;
    const newart = {
      title,
      body,
      user_id: user.user_id,
      topic: selectedTopic,
    };

    // addNewArticle(selectedTopic, newart);

    // Object.keys(newart).forEach((article_item) => {
    //   if (!newart[article_item]) {
    //     console.log('hi');
    //     if (article_item === 'body') this.setState({ newArticleError: `${this.state.newArticleError} Article text, ` });
    //     else this.setState({ newArticleError: `${this.state.newArticleError} ${article_item}, ` });
    //   }
    // });

    // if (this.state.newart.newArticleError !== '') alert(`please enter ${this.state.newart.newArticleError}`);

    // if (!this.state.errorDetected) {
    //   console.log('hi', this.state);
    handleAddArticle(newart, user.username || JSON.parse(sessionStorage.user));
    this.handleReset();
    // } else alert(`please enter ${this.state.newart.newArticleError}`);
    

    event.preventDefault();
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
              <div>
                <div>
                  <label htmlFor="title">
                    Title
                    {' '}
                    <div className={`newTitle ${this.state.newTitleError ? 'article-invalid' : ''}`}>
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

                  </label>

                </div>


              </div>
              <div className="newFormLine">
                <div>
                  <label htmlFor="body">
                      Article Text
                    <div>
                      <textarea
                        className={`newArticleText ${this.state.newBodyError ? 'article-invalid' : ''}`}
                       // ="newArticleText"
                        value={body}
                        name="body"
                        // onFocus={(event) => {
                        //   this.handleChange(event);
                        // }}
                        // onBlur={(event) => {
                        //   this.handleChange(event);
                        // }}

                        onChange={(event) => {
                          this.handleChange(event);
                        }}

                        // onInput={(event) => {
                        //   this.handleChange(event);
                        // }}

                        rows="5"
                        cols="50"
                        wrap="soft"
                      />
                    </div>

                  </label>


                </div>

              </div>


              <div className="newArticleOptions">
                <div className={`newArticleTopicSelect ${this.state.newTopicError ? 'article-invalid' : ''}`}>

                  <TopicSelector
                    errorLabel={this.state.newTopicError ? 'topicselector-error' : ''}
                    handleTopic={this.handleTopic}
                    topics={topics}

                  />
                </div>

                <button disabled={this.state.errorDetected} className={this.state.errorDetected ? 'button-disabled newArticleSubmitButton' : 'newArticleSubmitButton'} type="submit">Add New Article</button>
              </div>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewArticle;
