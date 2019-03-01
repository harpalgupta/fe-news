import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';
import Comments from './Comments';


import Votes from './Votes';
import { handleErrors } from '../utils';

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


handleUpdateVotes = (article, index, votes) => {
  this.setState({ article: { ...article } });
};

  formatArticle = (article) => {
    const { user } = this.props;
    return (
      <div key={article.article_id} className="article-entry">


        <Votes
          article_id={article.article_id}
          type="article"
          votes={article.votes}
          handleUpdateVotes={this.handleUpdateVotes}
          user={user}
          author={article.author}
        />

        <div className="article">
          <Link
            key={`${article.article_id}article`}
            state={{ article }}
            to={`/article/${article.article_id}`}
          >
            {article.title}
            {article.body}
          </Link>
        </div>

        <div key={article.article_id} className="article-foot">
          <div>
Comments:
            {article.comment_count}
          </div>
          <div>
            {' '}
Author:
            {article.author}
          </div>
          <div>
            {' '}
Created_at:
            {article.created_at}
          </div>
        </div>
      </div>
    );
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
      <div className="content">
        <h2>
Article:
          {article.title}
        </h2>

        <div>{this.formatArticle(article)}</div>

        <Comments article_id={article_id} user={user} />
      </div>
    );
  }
}


export default Article;
