import React, { Component } from 'react';
import * as api from '../api';

class Topics extends Component {
  state = { topics: [] };

  componentDidMount() {
    const { topic } = this.props;
    api.fetchAllTopics(topic).then(topics => this.setState(topics));
  }

  render() {
    const { topics } = this.state;
    return (
      <div className="content">
        <h2>Topics</h2>
        <ul>
          {topics.map(topic => <li key={topic.slug}>{topic.slug}</li>)}
        </ul>
      </div>
    );
  }
}

export default Topics;
