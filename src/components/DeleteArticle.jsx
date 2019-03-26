import React, { Component } from 'react';

import * as api from '../api';
import { handleErrors } from '../utils';

class DeleteArticle extends Component {
  goDeleteArticle = () => {
    const { article_id, index, handleDeleteArticle } = this.props;
    return api
      .deleteArticle(article_id)
      .then((data) => {
        handleDeleteArticle(article_id, index);

        if (data === {}) {
          handleDeleteArticle(
            article_id,
            index
          );
          return `${article_id} deleted`;
        }
        return null;
      })
      .catch((err) => {
        handleErrors(err);
      });
  }

  render() {
    const { article_id } = this.props;
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
        <button type="button" onClick={this.goDeleteArticle}>
          DELETE Article ID
          {' '}
          {article_id}
        </button>

      </>
    );
  }
}

export default DeleteArticle;
