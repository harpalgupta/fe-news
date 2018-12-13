import React, { Component } from "react";
import * as api from "../api";
import { Router, Link } from "@reach/router";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArticleEntry from "./ArticleEntry";
import ArticleEntries from "./ArticleEntries";
// import { formatArticle } from "../utils";

class Articles extends Component {
  state = {
    articles: [],
    topics: [],
    selectedTopic: "",
    votes: 0
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
            <div key={article.article_id}>{this.formatArticle(article)}</div>
          );
        })}
      </div>
    );
  }

  formatArticle = article => {
    return (
      <div key={article.article_id} className="article-entry">
        <div className="articletitle">{article.title}</div>
        <div className="vote">
          <button
            key={`${article.article_id}UP`}
            className="votearrow"
            onClick={() => {
              api.updateArticleVote(article.article_id, 1).then(article => {
                this.setState({ article: { ...article } });
                this.setState({ votes: this.state.votes + 1 });
              });
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faArrowUp}>voteUp</FontAwesomeIcon>
          </button>
          Votes:{article.votes}
          <button
            key={`${article.article_id}Down`}
            className="votearrow"
            onClick={() => {
              api.updateArticleVote(article.article_id, -1).then(article => {
                this.setState({ article: { ...article } });
                this.setState({ votes: this.state.votes + 1 });
              });
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faArrowDown}>voteDown</FontAwesomeIcon>
          </button>
          <div />
        </div>

        <div className="article">
          <Link
            key={`${article.article_id}article`}
            // state={{ article: article }}
            to={`/article/${article.article_id}`}
          >
            {article.title}
            {article.body}
          </Link>
        </div>

        <div key={article.article_id} className="article-foot">
          <div>Comments:{article.comment_count}</div>
          <div> Author:{article.author}</div>
          <div> Created_at:{article.created_at}</div>
        </div>
      </div>
    );
  };

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

    if (prevState.votes !== this.state.votes) {
      console.log("vote detected");
      api.fetchArticles(this.state.selectedTopic).then(articles => {
        this.setState({ ...articles }, () => {
          console.log(this.state);
        });
      });
    }
  }
}

export default Articles;
