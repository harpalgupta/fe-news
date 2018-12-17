import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Articles from "./components/Articles";
import Topics from "./components/Topics";
import { Router } from "@reach/router";

import Article from "./components/Article";
import Login from "./components/Login";
import DeleteArticle from "./components/DeleteArticle";
import Errors from "./components/Errors";
import DeleteComment from "./components/DeleteComment";

class App extends Component {
  state = {
    articles: [],
    selectedTopic: "",
    user: {},
    userValid: false,
    users: []
  };
  render() {
    return (
      <div className="App">
        <Header
          loggedInAs={this.state.user.username}
          user={sessionStorage.user ? JSON.parse(sessionStorage.user) : ""}
          logOut={this.logOut}
        />
        <NavBar handleTopic={this.handleTopic} />
        <SideBar />
        <div className="content">
          <Login
            storeUser={this.storeUser}
            // user={this.state.user}
            user={sessionStorage.user ? JSON.parse(sessionStorage.user) : ""}
          >
            <Router>
              <Articles
                path="/articles"
                topic={this.state.selectedTopic}
                //loggedInAs={JSON.parse(sessionStorage.user).username}
                user={
                  sessionStorage.user ? JSON.parse(sessionStorage.user) : ""
                }
              />
              <Topics path="/topics/*" />

              <Article
                path="/articles/:article_id"
                user={
                  sessionStorage.user ? JSON.parse(sessionStorage.user) : ""
                }
              />

              <DeleteArticle path="/articles/:article_id/delete" />
              <DeleteComment path="/articles/:article_id/comments/:comment_id/delete" />
            </Router>
          </Login>

          <>
            <Router>
              <Errors path="/error" />
            </Router>
          </>
        </div>
      </div>
    );
  }

  storeUser = user => {
    sessionStorage.setItem("user", JSON.stringify(user));
    if (sessionStorage.user)
      this.setState({ user: JSON.parse(sessionStorage.user) });
    // });
  };

  logOut = () => {
    sessionStorage.removeItem("user");
    this.setState({ user: {} });
  };
}

export default App;
