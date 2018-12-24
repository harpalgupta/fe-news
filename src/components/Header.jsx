import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { Component } from "react";

class Header extends Component {
  // state = { username: "" };
  render() {
    return (
      <div className="header">
        <img
          className="header-img"
          src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_second.png"
        />
        <div className="header-text">K-News</div>
        <div className="LoginHeader">
          {this.props.user.username ? (
            <>
              Logged In As {this.props.user.username}
              {console.log(this.props.user)}
              <img className="userAvatar" src={this.props.user.avatar_url} />
              <div className="logout-button">
                <button onClick={this.props.logOut}>Log Out</button>
              </div>
            </>
          ) : (
            <>Not Logged in {this.props.user.username}</>
          )}
        </div>
      </div>
    );
  }
  // componentDidMount() {
  //   console.log("mounting header");
  //   this.setState({ username: this.props.loggedInAs });
  // }
  // componentWillReceiveProps(props) {
  //   this.setState({ username: props.user.username });
  // }
}

export default Header;
