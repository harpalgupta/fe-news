import React, { Component } from 'react';
import './TopicSelector.css';

class TopicSelector extends Component {
  render() {
    const { handleTopic, topics, errorLabel } = this.props;
    return (
      <select
        className={errorLabel}
        name="topicselector"
        id="topicselector"
        onChange={(event) => {
          handleTopic(event.target.value);
        }}
      >
        <option key="Select a Topic" value="">
          all topics
        </option>

        {topics.map(topic => (
          <option key={topic.slug} value={topic.slug}>
            {topic.slug}
          </option>
        ))}
      </select>
    );
  }
}

export default TopicSelector;
