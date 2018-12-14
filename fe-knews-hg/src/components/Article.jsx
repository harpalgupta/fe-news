import React, { Component } from "react";
import * as api from "../api";
import ArticleEntry from "./ArticleEntry";
import Comments from "./Comments";

class Article extends Component {
  state = {
    article: { votes: 0 },
    comments: []
  };
  render() {
    return (
      <div className="content">
        <h2>Article: {this.state.article.title}</h2>

        <div>
          {
            <ArticleEntry
              article={this.state.article}
              article_id={this.props.article_id}
            />
          }
        </div>

        <Comments article_id={this.props.article_id} user={this.props.user} />
      </div>
    );
  }

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
