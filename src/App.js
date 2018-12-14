import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Articles from "./components/Articles";
import Topics from "./components/Topics";
import { Router } from "@reach/router";

import Article from "./components/Article";
import SubmitArticle from "./components/SubmitArticle";
import Login from "./components/Login";
import DeleteArticle from "./components/DeleteArticle";
import Errors from "./components/Errors";

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
        <Header loggedInAs={this.state.user.username} />
        <NavBar handleTopic={this.handleTopic} />
        <SideBar />

        <Login storeUser={this.storeUser} user={this.state.user}>
          <Router>
            <Articles
              path="/articles"
              topic={this.state.selectedTopic}
              loggedInAs={this.state.user.username}
            />
            <Topics path="/topics/*" />

            <Article path="/article/:article_id" user={this.state.user} />
            <SubmitArticle
              handleAddArticle={this.handleAddArticle}
              path="/articles/submitArticle"
              user={this.state.user}
            />
            <DeleteArticle path="/articles/:article_id/delete" />
            <Errors path="/error" />
          </Router>
        </Login>
      </div>
    );
  }

  storeUser = user => {
    this.setState({ user });
    // });
  };
}

export default App;
