import React, { Component } from 'react';
import * as api from '../api';
import Comments from './Comments';

import { handleErrors } from '../utils';
import FormattedArticle from './FormattedArticle';


class Article extends Component {
  state = {
    article: { votes: 0 },
  };

  componentDidMount() {
    const { article_id } = this.props;
    api.fetchArticleArticleID(article_id).then((article) => {
      this.setState({ article });
    });
  }

  handleDeleteArticle = () => {
    // console.log('in handle delte article for single articles');
    this.setState({ article: {} });
  };


  // handleUpdateVotes = (article, index, votes) => {
  //   this.setState({ article: { ...article } });
  // };
  handleUpdateVotes = (tmparticle) => {
    const { article } = this.state;
    const tmpArticle = article;
    tmpArticle.votes = tmparticle.votes;

    this.setState({
      article: tmpArticle
    });
  };


  render() {
    const { article_id, user } = this.props;
    const { article } = this.state;
    const artId = article_id * 1;
    if (Number.isNaN(artId)) {
      const err = { response: { status: 0, data: { msg: '' } } };

      err.response.status = 400;
      err.response.data.msg = 'Local Error Article Id must be a number';
      handleErrors(err);
      return <div />;
    }

    return (
      <div>
        <h2>{article.title ? article.title : 'Deleted Article'}</h2>
        {article.title
          ? (
            <div className="article-list">


              <div className="article-entry">
                {article.title ? FormattedArticle(true, article, 0, user, this.handleUpdateVotes, this.handleDeleteArticle) : 'Deleted'}


              </div>
              <Comments article_id={article_id} user={user} />
            </div>
          ) : <div className="article-list" />}
      </div>
    );
  }
}


export default Article;
