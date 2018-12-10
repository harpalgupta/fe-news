import React, { Component } from "react";
import * as api from "../api";
class Topics extends Component {
  state = { topics: [] };

  render() {
    return (
      <div className="content">
        <h2>Topics</h2>
        <ul>
          {this.state.topics.map(topic => {
            //  console.log(article);
            return <li key={topic.slug}>{topic.slug}</li>;
          })}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    api.fetchAllTopics(this.props.topic).then(topics => this.setState(topics));
  }
}

export default Topics;
