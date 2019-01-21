import React, { Component } from "react";

class TopicSelector extends Component {
  render() {
    return (
      <select
        name="topicselector"
        id="topicselector"
        onChange={event => {
          this.props.handleTopic(event.target.value);
        }}
      >
        <option key="Select a Topic" value="">
          all topics
        </option>

        {this.props.topics.map(topic => {
          return (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          );
        })}
      </select>
    );
  }
}

export default TopicSelector;
