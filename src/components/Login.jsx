import React, { Component } from "react";
import * as api from "../api";
import { handleErrors } from "../utils";

class Login extends Component {
  state = {
    user: ""
  };
  render() {
    if (this.props.user.username) return this.props.children;

    return (
      <div>
        Login Page
        <form className="loginForm" onSubmit={this.handleSubmit}>
          <input
            value={this.state.user}
            onChange={this.handleChange}
            pattern=".{4,}"
            required
            title="4 characters minimum"
          />
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
    api
      .checkUserValid(this.state.user)
      .then(this.props.storeUser)
      .catch(err => {
        console.log(err);
        handleErrors(err);
      });
    //this.props.login(this.state.user);
    // this.setState({ user: event.target.value });
  };
}

export default Login;
