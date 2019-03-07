import { Link } from '@reach/router';
import React, { Component } from 'react';
import * as api from '../api';
import './NavBar.css';


class NavBar extends Component {
  componentDidMount() {
    api.fetchAllTopics(this.props.topic).then(topics => this.setState(topics));
  }


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
