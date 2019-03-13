import React, { Component } from 'react';

class TopicSelector extends Component {
  render() {
    const { handleTopic, topics } = this.props;
    return (
      <select
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
