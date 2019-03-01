import { Link } from '@reach/router';
import React, { Component } from 'react';
import * as api from '../api';


class NavBar extends Component {
  state = { topics: [], selectedTopic: '' };

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
