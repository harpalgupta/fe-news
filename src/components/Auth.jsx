import React, { Component } from 'react';
import Login from './Login';

class Auth extends Component {
  render() {
    const { userValid, children, storeUser } = this.props;

    if (userValid) return children;
    return (
      <div>
        <Login login={storeUser} />
      </div>
    );
  }
}

export default Auth;
