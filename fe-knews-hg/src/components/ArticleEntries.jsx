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

class ArticleEntries extends Component {
  state = { articles: [] };

  render() {
    // return this.state.articles.map(article => {
    //   formatArticle(article);
    // });
    return <div>hi</div>;
  }
  componentDidMount() {
    api.fetchArticles(this.props.topic).then(articles => {
      this.setState({ articles });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    //   console.log(prevState.article, this.state.article);
    if (prevProps.article_id != this.props.article_id) {
      api.fetchArticles(this.props.topic).then(articles => {
        this.setState({ articles });
      });
    }
  }
}

export default ArticleEntries;
