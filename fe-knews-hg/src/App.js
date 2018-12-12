import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Articles from "./components/Articles";
import Topics from "./components/Topics";
import { Router } from "@reach/router";
import Comments from "./components/Comments";
import Article from "./components/Article";
import SubmitArticle from "./components/SubmitArticle";
import Auth from "./components/Auth";
import * as api from "./api";

class App extends Component {
  state = {
    articles: [],
    selectedTopic: "",
    user: { username: "" },
    users: []
  };
  render() {
    return (
      <div className="App">
        {/* <div>{this.getUsers()}</div> */}
        <Header />
        <NavBar handleTopic={this.handleTopic} />
        <SideBar />
        {/* <Articles /> */}
        <>
          <Auth login={this.login} user={this.state.user}>
            <Router>
              <Articles path="/articles" topic={this.state.selectedTopic} />
              <Topics path="/topics/*" />
              {/* <Articles path={`/topics/${this.state.selectedTopic}/articles`} /> */}
              <Article path="/article/:article_id" />
              <SubmitArticle
                handleAddArticle={this.handleAddArticle}
                path="/articles/submitArticle"
              />
            </Router>
          </Auth>
        </>
      </div>
    );
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // if (prevState.selectedTopic!=this.state.selectedTopic){}
  // }
  login = user => {
    this.setState(user);
  };

  componentDidMount() {
    {
      api
        .checkUserValid("jessjelly2")
        .then(validuser => {
          if (validuser) {
            this.setState({ user: validuser });
          }
          //this.setState({ users }, () => console.log(this.state));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}

export default App;
