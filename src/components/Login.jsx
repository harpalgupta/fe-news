import React, { Component } from 'react';
import * as api from '../api';
import { handleErrors } from '../utils';
import './Login.css';

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

  delayLoad = () => {
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
      <div className="login-page">
        <div className="login-body">
          <div>
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

          </div>

          <div className="login-list">

            <div className="valid-users">
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
        <div className="login-info">
          <h4>Frontend Source Code  <a href="https://github.com/harpalgupta/fe-news" > https://github.com/harpalgupta/fe-news </a> </h4>
          <h4>Backend Api <a href="https://knews-prod.herokuapp.com/api" > https://knews-prod.herokuapp.com/api </a> </h4>
          <h4>Swagger Docs for Backend Api<a href="https://knews-prod.herokuapp.com/swagger" > https://knews-prod.herokuapp.com/swagger </a> </h4>
          <h4>Backend Source Code <a href="https://github.com/harpalgupta/BE2-NC-Knews-harpal" > https://github.com/harpalgupta/BE2-NC-Knews-harpal </a> </h4>
        </div>
      </div>
    );
  }
}

export default Login;
