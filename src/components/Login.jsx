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
  };

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
      <div className="col-row col-sm-6">
        <h2 className="ml-0">Login Page</h2>
        <div>
          <form className="float-left col-sm-12 p-0" onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Login User"
                aria-label="Login User"
                aria-describedby="basic-addon2"
                value={this.state.user}
                onChange={this.handleChange}
                pattern=".{4,}"
                required
                title="4 characters minimum"
              />
              <div className="input-group-append">
                <button className="btn btn-info" type="submit">Login</button>
              </div>


            </div>
          </form>


        </div>

        <div className="">
          <div className="card bg-dark">
            <div className="card-title">
              <h3>Valid Users:</h3>
            </div>


            <div
              className={
                !delayed || users.length === 0
                  ? 'lds-dual-ring'
                  : 'loaded-users'
              }
            >
              <div className="loading-text">Getting Users..</div>
            </div>

            <ul
              className={
                delayed && users.length !== 0 ? 'user-list' : 'loaded-users'
              }
            >
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
    );
  }
}

export default Login;
