import React from 'react';
import { Link } from '@reach/router';
import Dotdotdot from 'react-dotdotdot';

import DeleteArticle from './DeleteArticle';
import Votes from './Votes';

function FormattedArticle(
  singleArticle,
  article,
  index,
  user,
  handleUpdateVotes,
  handleDeleteArticle
) {
  const artDate = new Date(article.created_at);
  return (
    <div className="card bg-dark">
      <div className="card-title">
        <h4>{article.title}</h4>
      </div>

      <Votes
        article_id={article.article_id}
        type="article"
        votes={article.votes}
        index={index}
        handleUpdateVotes={handleUpdateVotes}
        user={user}
        author={article.author}
      />
      <div className="card-body">
        {singleArticle ? (
          article.body
        ) : (
          <Link
            key={`${article.article_id}article`}
            to={`/articles/${article.article_id}`}
          >
            <Dotdotdot clamp={5}>{article.body}</Dotdotdot>
          </Link>
        )}
      </div>

      <div key={article.article_id} className="card-footer">
        <div>
          Topic:
          <div className="article-foot__value">{article.topic}</div>
        </div>
        <div>
          Comments:
          <div className="article-foot__value">{article.comment_count}</div>
        </div>
        <div>
          Author:
          {article.author === user.username ? (
            <>
              <div className="article-foot__value">ME!!!</div>

              <div className="delete-button">
                <DeleteArticle
                  handleDeleteArticle={handleDeleteArticle}
                  article_id={article.article_id}
                  index={index}
                />
              </div>
            </>
          ) : (
            <>
              <div className="article-foot__value">{article.author}</div>
            </>
          )}
        </div>
        Article Created:
        <div className="article-foot__value">
          {artDate.toLocaleDateString()}
          {' '}
          {artDate.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default FormattedArticle;
