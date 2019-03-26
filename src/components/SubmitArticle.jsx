// { title: 'harpal the GEEK', user_id: '2', body: 'so Geeky' }

import React, { Component } from 'react';
import * as api from '../api';
import { handleErrors } from '../utils';

class SubmitArticle extends Component {
  state = {
    newForm: { title: '', user_id: this.props.user.user_id, body: '' }
  };


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      prevState => ({
        newForm: {
          ...prevState.newForm,
          [name]: value
        }
      }),
      () => {}
    );
  };

  handleSubmit = (event) => {
    const { newForm } = this.state;
    event.preventDefault();
    this.handleAddArticle(newForm);
  };

  handleAddArticle = (newArticle) => {
    api
      .addNewArticle(newArticle.topic, newArticle)
      .then()
      .catch((err) => {
        handleErrors(err);
      });
  };

  render() {
    const { newForm } = this.state;

    return (
      <div className="content">
        <div>
          <form
            className="newArticleForm"
            onSubmit={(event) => {
              this.handleSubmit(event);
            }}
          >
            <div>
              <label htmlFor="topic">Topic</label>
              <input
                value={newForm.topic}
                name="topic"
                onChange={(event) => {
                  this.handleChange(event);
                }}
              />
              <label htmlFor="title">Article title</label>
              <input
                value={newForm.title}
                name="title"
                onChange={(event) => {
                  this.handleChange(event);
                }}
              />
            </div>
            <div>
              <label htmlFor="userid">User ID</label>
              <input
                value={newForm.user_id}
                name="user_id"
                onChange={(event) => {
                  this.handleChange(event);
                }}
                disabled
              />
            </div>
            <div>
              <label htmlFor="body">Article Text</label>
              <input
                value={newForm.body}
                name="body"
                onChange={(event) => {
                  this.handleChange(event);
                }}
              />
            </div>

            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SubmitArticle;
