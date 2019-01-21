import React, { Component } from "react";
import * as api from "../api";
import { handleErrors } from "../utils";




class Login extends Component {
  state = {
    user: "",
    users: []
  };
  render() {
    if (this.props.user.username) return this.props.children;

    return (
      <div>
        <h2>Login Page</h2>
        <div className="login-page">
          <form className="loginForm" onSubmit={this.handleSubmit}>
            <input
              className="loginInput"
              value={this.state.user}
              onChange={this.handleChange}
              pattern=".{4,}"
              required
              title="4 characters minimum"
            />
            <button type="submit">Login</button>
          </form>
          <div>
            <h3>Valid Users:</h3>
            <ul className="user-list">
              {this.state.users.map(user => {
                const avtarurl=user.avatar_url.replace("https://","http://")
                // console.log(avtarurl)
                return <div className="user-entry">
                  <li key={user.user_id}>
                    {" "}
                    
                    <img className="userAvatar" src={avtarurl} alt={user.username} onError={(e)=>{e.target.onerror = null; e.target.src="https://img.icons8.com/ios-glyphs/30/000000/gender-neutral-user.png"}}/>
                    <div className="usernameEntry">{user.username}</div>
                  </li>
                </div>
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    api
      .getUsers()
      .then(users => {
        this.setState({ users: users });
      })
      .catch(err => {
        handleErrors(err);
      });
  };
  handleChange = event => {
    this.setState({ user: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    api
      .checkUserValid(this.state.user)
      .then(this.props.storeUser)
      .catch(err => {
        handleErrors(err);
      });

  };
}

export default Login;
