import React, { Component } from 'react';

class Errors extends Component {
  render() {
    const { errcontent } = this.props.location.state;
    return (
      <div>
        Error
        {' '}
        {errcontent.errstatus}
        {' '}
        {errcontent.errMsg}
      </div>
    );
  }
}

export default Errors;
