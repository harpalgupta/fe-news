import React, { Component } from "react";
import * as api from "../api";

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
        <ul>
          {this.state.articles.map(article => {
            //  console.log(article);
            return <li key={article.article_id}>{article.title}</li>;
          })}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    api.fetchArticles(this.props.topic).then(articles => {
      this.setState(articles);
    });
  }
}

export default Articles;
