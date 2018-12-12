import React, { Component } from "react";
import * as api from "../api";
import { Router, Link } from "@reach/router";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Articles extends Component {
  state = {
    articles: []
  };

  render() {
    return (
      <div className="content">
        {this.props.topic ? (
          <h2>Articles By Topic {this.props.topic}</h2>
        ) : (
          <h2>Articles</h2>
        )}
        {this.state.articles.map(article => {
          return (
            <div key={article.article_id} className="article-entry">
              <div className="articletitle">{article.title}</div>
              <div className="vote">
                <button
                  className="votearrow"
                  onClick={() => {
                    api
                      .updateArticleVote(article.article_id, 1)
                      .then(something => {
                        console.log(something);
                      });
                  }}
                >
                  {" "}
                  <FontAwesomeIcon icon={faArrowUp}>voteUp</FontAwesomeIcon>
                </button>
                Votes:{article.votes}
                <button
                  className="votearrow"
                  onClick={() => {
                    api
                      .updateArticleVote(article.article_id, -1)
                      .then(something => {
                        console.log(something);
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
                  key={article.article_id}
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
        })}
      </div>
    );
  }
  componentDidMount() {
    api.fetchArticles(this.props.topic).then(articles => {
      this.setState(articles);
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic != this.props.topic)
      api.fetchArticles(this.props.topic).then(articles => {
        this.setState(articles);
      });
  }
}

export default Articles;
{
  /* <Link
state={{ article: article }}
to={`/article/${article.article_id}`}
>

                  </Link> */
}
