
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
        <div className="LoginHeader">
          <div className="loginUser">
            {this.props.user.username ? (
              <>

                <>
                  {' '}
                  <div className="login-user-text">
                    {this.props.user.username}

                  </div>

                  <div className="login-user-image">
                    {/* <img src="https://img.icons8.com/ios-glyphs/30/000000/gender-neutral-user.png" alt="user avtar pic" /> */}
                    <FontAwesomeIcon icon={faUser} />
                  </div>

                </>

                <button className="logout-button" onClick={this.props.logOut}>Log Out</button>
              </>
            ) : (
                <>
                  Not Logged in
                {this.props.user.username}
                </>
              )}
          </div>
        </div>
      </>
    );
  }
}

export default Header;
