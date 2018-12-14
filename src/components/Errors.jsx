import React, { Component } from "react";

class Errors extends Component {
  render() {
    const { errcontent } = this.props.location.state;
    return (
      <div className="content">
        <div>
          Error {errcontent.errstatus} {errcontent.errMsg}
        </div>
      </div>
    );
  }
}

export default Errors;
