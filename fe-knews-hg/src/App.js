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
import * as api from "./api";
import Login from "./components/Login";

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
        {/* <div>{this.getUsers()}</div> */}
        <Header />
        <NavBar handleTopic={this.handleTopic} />
        <SideBar />
        {/* <Auth login="">
          <div>
            <Login />
          </div>
        </Auth> */}

        <Login storeUser={this.storeUser} user={this.state.user}>
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
        </Login>
      </div>
    );
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // if (prevState.selectedTopic!=this.state.selectedTopic){}
  // }
  storeUser = user => {
    // this.setState(user, () => {
    // console.log("ZZZZZZZZZZZZZZ", user);
    this.setState({ user });
    // });
  };

  // componentDidMount() {
  //   {
  //     console.log("mounted");
  //     api
  //       //   .checkUserValid("jessjelly1")
  //       .checkUserValid(this.state.user)
  //       .then(validuser => {
  //         console.log(validuser);
  //         if (validuser) {
  //           this.setState({ userValid: true });
  //         }
  //         //this.setState({ users }, () => console.log(this.state));
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   {
  //     console.log("updated");
  //     console.log(prevState.user, this.state.user);
  //     if (prevState.userValid !== this.state.userValid) {
  //       api
  //         //   .checkUserValid("jessjelly1")
  //         .checkUserValid(this.state.user)
  //         .then(validuser => {
  //           console.log(validuser);

  //           if (validuser) {
  //             this.setState({ userValid: true });
  //           }
  //           //this.setState({ users }, () => console.log(this.state));
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         });
  //     }
  //   }
  // }
}

export default App;
