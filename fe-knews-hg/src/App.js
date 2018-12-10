import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Articles from "./components/Articles";
import Topics from "./components/Topics";
import * as api from "./api";
import { Router } from "@reach/router";

class App extends Component {
  state = {
    articles: []
  };
  render() {
    return (
      <div className="App">
        <Header />
        <NavBar />

        <SideBar />
        {/* <Articles /> */}
        <>
          <Router>
            <Articles path="/articles" />
            <Topics path="/topics/*" />
            <Articles path="/topics/:topic/articles" />
          </Router>
        </>
      </div>
    );
  }
}

export default App;
