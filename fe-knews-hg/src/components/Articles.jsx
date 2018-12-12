import React, { Component } from "react";
import * as api from "../api";
import { Router, Link } from "@reach/router";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArticleEntry from "./ArticleEntry";
import ArticleEntries from "./ArticleEntries";
import { formatArticle } from "../utils";

class Articles extends Component {
  state = {
    articles: [],
    topics: [],
    selectedTopic: ""
  };

  render() {
    return (
      <div className="content">
        {this.state.selectedTopic ? (
          <div>
            <h2>Articles By Topic {this.state.selectedTopic}</h2>
          </div>
        ) : (
          <div>
            {" "}
            <h2>Articles</h2>
          </div>
        )}
        <select
          name="topicselector"
          id="topicselector"
          onChange={event => {
            console.log(event.target.value);
            this.handleTopic(event.target.value);
          }}
        >
          <option key="all" value="">
            all topics
          </option>

          {this.state.topics.map(topic => {
            //  console.log(article);
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
        {this.state.articles.map(article => {
          console.log(article, "THIS IS IN MAP OF ARTICLES");
          return (
            <div key={article.article_id}>
              {/* <ArticleEntry
                article={article}
                article_id={article.article_id}
                topic={this.state.selectedTopic}
              /> */}
              {formatArticle(article)}
              {/* <ArticleEntries topic={this.selectedTopic} /> */}
            </div>
          );
        })}
      </div>
    );
  }
  handleTopic = selectedTopic => {
    this.setState({ selectedTopic: selectedTopic });
  };
  componentDidMount() {
    api
      .fetchAllTopics(this.state.selectedTopic)
      .then(topics => this.setState(topics));
    api.fetchArticles(this.state.selectedTopic).then(articles => {
      console.log(articles);
      this.setState({ ...articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedTopic != this.state.selectedTopic) {
      console.log("NOT SAME", this.state.selectedTopic);
      api.fetchArticles(this.state.selectedTopic).then(articles => {
        this.setState({ ...articles }, () => {
          console.log(this.state);
        });
      });
    }
  }
}

export default Articles;
