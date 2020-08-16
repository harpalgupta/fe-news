import { Link } from '@reach/router';
import React, { Component } from 'react';
import * as api from '../api';
import './NavBar.css';


class NavBar extends Component {
  componentDidMount() {
    const { topic } = this.props;
    api.fetchAllTopics(topic).then(topics => this.setState(topics));
  }


  render() {
    return (

      <div className="navbar col-sm-12">
        <div className="navbar" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/articles">
              Home
              </Link>

            </li>
          </ul>
        </div>


      </div>
    );
  }
}

export default NavBar;
