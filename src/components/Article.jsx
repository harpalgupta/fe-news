import React, { Component } from "react";
import * as api from "../api";
import Comments from "./Comments";

import { Link } from "@reach/router";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Article extends Component {
  state = {
    article: { votes: 0 },
    comments: []
  };
  render() {
    return (
      <div className="content">
        <h2>Article: {this.state.article.title}</h2>

        <div>{this.formatArticle(this.state.article)}</div>

        <Comments article_id={this.props.article_id} user={this.props.user} />
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
                this.forceUpdate();
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
            state={{ article: article }}
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
  componentDidMount() {
    api.fetchArticleArticleID(this.props.article_id).then(article => {
      this.setState({ article });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.article.votes !== this.state.article.votes) {
      this.setState({ article: { ...this.state.article } });
    }
  }
}

export default Article;
