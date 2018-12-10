import React from "react";
import { Router, Link } from "@reach/router";
const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/articles">Home</Link>
      {" | "}
      <Link to="/topics">Topics</Link>
    </div>
  );
};

export default NavBar;
