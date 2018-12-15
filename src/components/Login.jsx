import React, { Component } from "react";
import * as api from "../api";

class Login extends Component {
  state = {
    user: ""
  };
  render() {
    console.log(this.props);
    if (this.props.user.username) return this.props.children;

    return (
      <div>
        Login Page
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.user} onChange={this.handleChange} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  handleChange = event => {
    this.setState({ user: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    api.checkUserValid(this.state.user).then(this.props.storeUser);
    //this.props.login(this.state.user);
    // this.setState({ user: event.target.value });
  };
}

export default Login;
