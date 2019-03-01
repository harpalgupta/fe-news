
import React, { Component } from 'react';

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
          {this.props.user.username ? (
            <>
                Logged In As
              {' '}
              {this.props.user.username}
              <div>
                <img src="https://img.icons8.com/ios-glyphs/30/000000/gender-neutral-user.png" alt="user avtar pic" />

              </div>
              <div className="logout-button">
                <button onClick={this.props.logOut}>Log Out</button>
              </div>
            </>
          ) : (
            <>
Not Logged in
              {this.props.user.username}
            </>
          )}
        </div>
      </>
    );
  }
}

export default Header;
