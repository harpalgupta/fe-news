import React, { Component } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
  // state = { username: "" };
  render() {
    return (
      <>
        <div className="header">
          <img
            className="header-img"
            src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_second.png"
            alt="northcoders logo"
          />
          <div className="header-text">K-News</div>
        </div>
        <div className="LoginHeader m-0">
          <div className="loginHeaderContent">
            <div className="loginUser">
              {this.props.user.username ? (
                <>
                  <div className="loginUserDetails">
                    {' '}
                    <div className="login-user-image">
                      {/* <img src="https://img.icons8.com/ios-glyphs/30/000000/gender-neutral-user.png" alt="user avtar pic" /> */}
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="login-user-text">
                      {this.props.user.username}
                    </div>
                  </div>

                  <button className="btn btn-info" onClick={this.props.logOut}>
                    Log Out
                  </button>
                </>
              ) : (
                <div className="not-loggedin">Not Logged in</div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
