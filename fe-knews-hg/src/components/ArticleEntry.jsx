import React, { Component } from "react";
import * as api from "../api";
import { Router, Link } from "@reach/router";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatArticle } from "../utils";

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

    return formatArticle(this.props.article);
  }
  componentDidMount() {
    api.fetchArticleArticleID(this.props.article_id).then(article => {
      this.setState({ article });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    //   console.log(prevState.article, this.state.article);
    if (prevProps.article_id != this.props.article_id) {
      api.fetchArticleArticleID(this.props.article_id).then(article => {
        this.setState({ article });
      });
    }
  }
}

export default ArticleEntry;
