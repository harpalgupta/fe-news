import React, { Component } from 'react';
import * as api from '../api';
import { handleErrors } from '../utils';

class Login extends Component {
  state = {
    user: '',
    users: [],
    delayed: false
  };

  componentDidMount() {
    this.fetchUsers();
    this.delayLoad();
  }

  delayLoad =() => {
    setTimeout(() => {
      this.setState({ delayed: true });
    }, 1000);
  }


  fetchUsers = () => {
    api
      .getUsers()
      .then((users) => {
        this.setState({ users });
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  handleChange = (event) => {
    this.setState({ user: event.target.value });
  };

  handleSubmit = (event) => {
    const { user } = this.state;
    const { storeUser } = this.props;
    event.preventDefault();
    api
      .checkUserValid(user)
      .then(storeUser)
      .catch((err) => {
        handleErrors(err);
      });
  };

  render() {
    const { user, children } = this.props;
    const { delayed, users } = this.state;
    if (user.username) return children;

    return (
      <div>
        <h2>Login Page</h2>
        <div className="login-page">
          <div className="login-list">
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

              <div className={!delayed || users.length === 0 ? 'lds-dual-ring' : 'loaded-users'}><div className="loading-text">Getting Users..</div></div>


              <ul className={delayed && users.length !== 0 ? 'user-list' : 'loaded-users'}>
                {users.map((user) => {
                  const avtarurl = user.avatar_url.replace('https://', 'http://');
                  // console.log(avtarurl)
                  return (
                    <div key={user.username} className="user-entry">
                      <li key={user.username}>
                        {' '}
                        <img
                          className="userAvatar"
                          src={avtarurl}
                          alt={user.username}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://img.icons8.com/ios-glyphs/30/000000/gender-neutral-user.png';
                          }}
                        />
                        <div className="usernameEntry">{user.username}</div>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Login;
