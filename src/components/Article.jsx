import React, { Component } from "react";
import * as api from "../api";
import Comments from "./Comments";

import { Link } from "@reach/router";

import Votes from "./Votes";
import { handleErrors } from "../utils";

class Article extends Component {
  state = {
    article: { votes: 0 },
    comments: []
  };
  render() {
    console.log("<<<<<<<<<<<<<<<<<<<<", this.props);
    let artId = this.props.article_id * 1;
    if (isNaN(artId)) {
      const err = { response: { status: 0, data: { msg: "" } } };

      err.response.status = 400;
      err.response.data.msg = "Local Error Article Id must be a number";
      handleErrors(err);
      return <div />;
    }

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
        <Votes
          article_id={article.article_id}
          handleUpdateVotes={this.handleUpdateVotes}
        />

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

  handleUpdateVotes = (article, index, votes) => {
    console.log("in handle update votes, new updated article", article);

    this.setState({ article: { ...article } });
  };

  componentDidMount() {
    api.fetchArticleArticleID(this.props.article_id).then(article => {
      this.setState({ article });
    });
  }
  componentDidUpdate(prevProps, prevState) {}
}

export default Article;
