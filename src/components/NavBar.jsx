import { Link } from '@reach/router';
import React, { Component } from 'react';
import * as api from '../api';


class NavBar extends Component {
  componentDidMount() {
    const { topic } = this.props;
    api.fetchAllTopics(topic).then(topics => this.setState(topics));
  }

  render() {
    return (
      <div className="navbar">
        <div className="navbar-link">
          <Link to="/articles">Home</Link>
        </div>
      </div>
    );
  }
}

export default NavBar;
