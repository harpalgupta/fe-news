import 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Header from './components/Header';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Articles from './components/Articles';
import Topics from './components/Topics';

import Article from './components/Article';
import Login from './components/Login';
import DeleteArticle from './components/DeleteArticle';
import Errors from './components/Errors';
import DeleteComment from './components/DeleteComment';
import Footer from './components/Footer';

class App extends Component {
  state = {
    selectedTopic: '',
    user: {},
  };


  storeUser = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    if (sessionStorage.user) this.setState({ user: JSON.parse(sessionStorage.user) });
    // });
  };

  logOut = () => {
    sessionStorage.removeItem('user');
    this.setState({ user: {} });
  };

  render() {
    const { selectedTopic } = this.state;
    return (
      <div className="App">
        <Header
          user={sessionStorage.user ? JSON.parse(sessionStorage.user) : ''}
          logOut={this.logOut}
        />
        <NavBar handleTopic={this.handleTopic} />
        <SideBar />
        <div className="content">

          <div className="content-background">
            <div className="overlay">


              <Login
                storeUser={this.storeUser}
                // user={this.state.user}
                user={sessionStorage.user ? JSON.parse(sessionStorage.user) : ''}
              >
                <Router>
                  <Articles
                    path="/articles"
                    topic={selectedTopic}
                    user={
                      sessionStorage.user ? JSON.parse(sessionStorage.user) : ''

                    }
                    default
                  />
                  <Topics path="/topics/*" />

                  <Article
                    path="/articles/:article_id"
                    user={
                      sessionStorage.user ? JSON.parse(sessionStorage.user) : ''
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
            <Footer />

          </div>
        </div>
      </div>


    );
  }
}

export default App;
