import React, { Component } from "react";
import * as api from "../api";
import { Router, Link } from "@reach/router";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const ArticleEntry = ({ article }) => {
//   return (

//   );
// };

// export default ArticleEntry;

class ArticleEntry extends Component {
  state = { article: {} };

  render() {
    // console.log("<<<<<<props<<<<<<<<", this.props);

    // console.log(this.state);
    const { article } = this.state;
    return (
      <div key={article.article_id} className="article-entry">
        <div className="articletitle">{article.title}</div>
        <div className="vote">
          <button
            key={`${article.article_id}UP`}
            className="votearrow"
            onClick={() => {
              api.updateArticleVote(article.article_id, 1).then(article => {
                this.setState({ article });
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
  }
  componentDidMount() {
    api.fetchArticleArticleID(this.props.article_id).then(article => {
      this.setState({ article });
    });
  }
  // componentDidUpdate(prevProps, prevState) {
  //   //   console.log(prevState.article, this.state.article);
  //   if (prevState.article.votes !== this.state.article.votes) {
  //   }
  //   return this.state;
  // }
}

export default ArticleEntry;
