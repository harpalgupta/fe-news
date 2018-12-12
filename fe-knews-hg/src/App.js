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

class App extends Component {
  state = {
    articles: [],
    selectedTopic: ""
  };
  render() {
    return (
      <div className="App">
        <Header />
        <NavBar handleTopic={this.handleTopic} />
        <SideBar />
        {/* <Articles /> */}
        <>
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
        </>
      </div>
    );
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // if (prevState.selectedTopic!=this.state.selectedTopic){}
  // }
}

export default App;
