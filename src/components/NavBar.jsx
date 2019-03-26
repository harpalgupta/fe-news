import { Link } from '@reach/router';
import React, { Component } from 'react';
import * as api from '../api';
import './NavBar.css';


class NavBar extends Component {
  componentDidMount() {
    const { topic } = this.props;
    api.fetchAllTopics(topic).then(topics => this.setState(topics));
  }
<<<<<<< HEAD
=======

>>>>>>> fd4300cf364112956a44791a495676d14701d529

  render() {
    return (
      <div className="navbar">
        <div className="navbar-link">
          <Link to="/articles">
            <button className="navbar-button" type="button">
            Home
            </button>

          </Link>

        </div>
      </div>
    );
  }
}

export default NavBar;
