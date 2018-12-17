import { Link } from "@reach/router";
import * as api from "../api";

import React, { Component } from "react";

class NavBar extends Component {
  state = { topics: [], selectedTopic: "" };

  render() {
    return (
      <div className="navbar">
        <div className="navbar-link">
          <Link to="/articles">Home</Link>
        </div>
      </div>
    );
  }

  componentDidMount() {
    api.fetchAllTopics(this.props.topic).then(topics => this.setState(topics));
  }
}

export default NavBar;
