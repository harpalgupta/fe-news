import React, { Component } from 'react';
import Login from './Login';

class Auth extends Component {
  state = { username: '' };

  render() {
    if (this.props.userValid) return this.props.children;
    return (
      <div>
        <Login login={this.props.storeUser} />
      </div>
    );
  }
}

export default Auth;
