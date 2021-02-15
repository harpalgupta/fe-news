import React, { Component } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../resources/img/Nc.png';

class Header extends Component {
  // state = { username: "" };
  render() {
    return (
      <>
        <div className="header pl-4 d-flex justify-content-between">
          <img
            className="header-img"
            src={logo}
            alt="northcoders logo"
          />
          <div className="header-text">K-News</div>
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
        </div>

      </>
    );
  }
}

export default Header;
