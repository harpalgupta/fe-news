import React, { Component } from 'react';

import * as api from '../api';
import { handleErrors } from '../utils';

class DeleteArticle extends Component {
  state = { output: '', errMsg: {} };

  render() {
    const artId = this.props.article_id * 1;
    if (isNaN(artId)) {
      const err = { response: { status: 0, data: { msg: '' } } };

      err.response.status = 400;
      err.response.data.msg = 'Local Error Article Id must be a number';
      handleErrors(err);
      return <div />;
    }

    return (
      <div>
        <button onClick={this.goDeleteArticle}>
          DELETE Article ID
          {' '}
          {this.props.article_id}
        </button>
      </div>
    );
  }

  goDeleteArticle = async => api
    .deleteArticle(this.props.article_id)
    .then((data) => {
      this.props.handleDeleteArticle(this.props.article_id, this.props.index);

      if (data === {}) {
        this.props.handleDeleteArticle(
          this.props.article_id,
          this.props.index
        );
        return `${this.props.article_id} deleted`;
      }
    })
    .catch((err) => {
      handleErrors(err);
    });
  // handleErrors = err => {
  //   const errcontent = {
  //     errstatus: err.response.status,
  //     errMsg: err.response.data.msg
  //   };
  //   navigate("/error", {
  //     state: {
  //       errcontent,
  //       replace: false
  //     }
  //   });
  // };
}

export default DeleteArticle;
