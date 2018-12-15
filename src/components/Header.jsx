import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { Component } from "react";

class Header extends Component {
  state = { username: "" };
  render() {
    return (
      <div className="header">
        <FontAwesomeIcon icon={faHome} />
        NC Knews
        {this.state.username ? (
          <div className="LoginHeader">logged in as {this.state.username} </div>
        ) : (
          <div className="LoginHeader">Not Logged in {this.state.username}</div>
        )}
      </div>
    );
  }
  // componentDidMount() {
  //   console.log("mounting header");
  //   this.setState({ username: this.props.loggedInAs });
  // }
  componentWillReceiveProps(props) {
    this.setState({ username: props.user.username });
  }
}

export default Header;
