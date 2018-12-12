import React, { Component } from "react";

class Auth extends Component {
  state = { username: "jessjelly" };
  render() {
    if (this.props.user.username) return this.props.children;
    return <div>not authorized</div>;
  }
}

export default Auth;
