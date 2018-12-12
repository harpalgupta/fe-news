import React from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Header = () => {
  return (
    <div className="header">
      <FontAwesomeIcon icon={faHome}>hi</FontAwesomeIcon>NC Knews
    </div>
  );
};

export default Header;
