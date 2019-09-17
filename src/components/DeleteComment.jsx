import React, { Component } from 'react';
import * as api from '../api';
import { handleErrors } from '../utils';

class DeleteComment extends Component {
  goDeleteComment = async => api
    .deleteComment(this.props.article_id, this.props.comment_id)
    .then((data) => {
      this.props.handleDeleteComment(this.props.comment_id, this.props.index);

      if (data === {}) {
        this.props.handleDeleteComment(
          this.props.comment_id,
          this.props.index
        );
        return `${this.props.comment_id} deleted`;
      }
    })
    .catch(err => handleErrors(err));

  render() {
    const artId = this.props.article_id * 1;
    const comId = this.props.comment_id * 1;

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
