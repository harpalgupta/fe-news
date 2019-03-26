import React, { Component } from 'react';
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

formatArticle = (article, index) => {
  const { user } = this.props;
  const artDate = new Date(article.created_at);
  return (
    <div key={article.article_id} className="article-entry">
      <div className="articletitle">{article.title}</div>

      <Votes
        article_id={article.article_id}
        type="article"
        votes={article.votes}
        index={index}
        handleUpdateVotes={this.handleUpdateVotes}
        user={user}
        author={article.author}
      />
      <div className="article">


        {article.body}


      </div>

      <div key={article.article_id} className="article-foot">
        <div>
Comments:
          <div className="article-foot__value">
            {article.comment_count}
          </div>
        </div>
        Author:

        {article.author === user.username ? (
          <div className="article-foot__value">
              ME!!!


          </div>

        ) : (
          <>

            <div className="article-foot__value">

              {article.author}
            </div>
          </>
        )}
        <div>
Created_at:
          <div className="article-foot__value">
            {artDate.toLocaleDateString()}
            {' '}
            {artDate.toLocaleTimeString()}
          </div>
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
    <>
      <h2>
Article:
        {article.title}
      </h2>

      <div>{this.formatArticle(article)}</div>

      <Comments article_id={article_id} user={user} />
    </>
  );
}
}


export default Article;
