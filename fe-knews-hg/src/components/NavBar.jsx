import { Router, Link } from "@reach/router";
import * as api from "../api";

import React, { Component } from "react";

class NavBar extends Component {
  state = { topics: [], selectedTopic: "" };

  render() {
    const { handleTopic } = this.props;
    return (
      <div className="navbar">
        <Link to="/articles">Home</Link>
        {" | "}
        <select
          name="topicselector"
          id="topicselector"
          onChange={event => {
            handleTopic(event.target.value);
          }}
        >
          <option key="all" value="">
            all topics
          </option>

          {this.state.topics.map(topic => {
            //  console.log(article);
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
        {/* <Link to="/topics">Topics</Link> */}
      </div>
    );
  }

  componentDidMount() {
    api.fetchAllTopics(this.props.topic).then(topics => this.setState(topics));
  }
}

export default NavBar;
