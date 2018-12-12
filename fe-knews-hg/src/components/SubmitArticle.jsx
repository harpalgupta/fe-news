//{ title: 'harpal the GEEK', user_id: '2', body: 'so Geeky' }

import React, { Component } from "react";
import * as api from "../api";

class SubmitArticle extends Component {
  state = { newForm: { title: "", user_id: "", body: "" } };

  render() {
    return (
      <div>
        <div className="content">
          <form
            onSubmit={event => {
              this.handleSubmit(event);
            }}
          >
            <label htmlFor="topic">Topic</label>
            <input
              value={this.state.newForm.topic}
              name="topic"
              onChange={event => {
                this.handleChange(event);
              }}
            />
            <label htmlFor="title">Article title</label>
            <input
              value={this.state.newForm.title}
              name="title"
              onChange={event => {
                this.handleChange(event);
              }}
            />
            <label htmlFor="userid">User ID</label>
            <input
              value={this.state.newForm.user_id}
              name="user_id"
              onChange={event => {
                this.handleChange(event);
              }}
            />
            <label htmlFor="body">Article Text</label>
            <input
              value={this.state.newForm.body}
              name="body"
              onChange={event => {
                this.handleChange(event);
              }}
            />
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    );
  }
  handleChange = event => {
    console.log("in handle change");
    console.log(this.state);
    const { name, value } = event.target;
    this.setState(
      prevState => ({
        newForm: {
          ...prevState.newForm,
          [name]: value
        }
      }),
      () => {
        console.log(this.state);
      }
    );
  };
  handleSubmit = event => {
    event.preventDefault();
    this.handleAddArticle(this.state.newForm);
  };

  handleAddArticle = newArticle => {
    api.addNewArticle(newArticle.topic, newArticle);
  };
}

export default SubmitArticle;
