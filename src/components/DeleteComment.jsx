import React, { Component } from 'react';
import * as api from '../api';
import { handleErrors } from '../utils';

class DeleteComment extends Component {
  goDeleteComment = () => api
    .deleteComment(this.props.article_id, this.props.comment_id)
    .then((data) => {
      const { handleDeleteComment, comment_id, index } = this.props;
      handleDeleteComment(comment_id, index);

      if (data === {}) {
        handleDeleteComment(
          comment_id,
          index
        );
        return `${comment_id} deleted`;
      }
    })
    .catch(err => handleErrors(err));

  render() {
    const artId = article_id * 1;
    const comId = comment_id * 1;

    if (isNaN(artId || comId)) {
      const err = { response: { status: 0, data: { msg: '' } } };

      err.response.status = 400;
      err.response.data.msg = 'Local Error Article and Comment Id must be a number';
      handleErrors(err);
      return <div />;
    }

    return (
      <div>
        <button type="button" onClick={this.goDeleteComment}>DELETE</button>
      </div>
    );
  }
}

export default DeleteComment;
