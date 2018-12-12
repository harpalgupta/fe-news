import React, { Component } from "react";
import * as api from "../api";
import ArticleEntry from "./ArticleEntry";

class Article extends Component {
  state = {
    article: {},
    comments: []
  };
  render() {
    return (
      <div className="content">
        <h2>Article: {this.state.article.title}</h2>

        {/* <article className="article-entry">{this.state.article.body}</article>
        <div> */}

        <div>
          {
            <ArticleEntry
              article={this.state.article}
              article_id={this.props.article_id}
            />
          }
        </div>
        <h3>Comments:</h3>

        {this.state.comments.map(comment => {
          return (
            <div className="comment-entry" key={comment.comment_id}>
              {comment.body}
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    // api.fetchArticleArticleID(this.props.article_id).then(article => {
    //   this.setState({ article });
    // });
    api.fetchCommentsByArticle(this.props.article_id).then(comments => {
      this.setState(comments);
    });
  }
}

export default Article;
