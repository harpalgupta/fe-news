import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as api from "../api";

import React, { Component } from "react";

class Header extends Component {
  state = { users: [] };
  render() {
    return (
      <div className="header">
        <FontAwesomeIcon icon={faHome}>hi</FontAwesomeIcon>NC Knews
      </div>
    );
  }
}

export default Header;
