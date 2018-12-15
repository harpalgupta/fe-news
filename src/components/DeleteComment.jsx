import React, { Component } from "react";
import { navigate } from "@reach/router";
import * as api from "../api";
import { handleErrors } from "../utils";

class DeleteComment extends Component {
  state = { output: "", errMsg: {} };
  render() {
    return (
      <div>
        <button onClick={this.goDeleteComment}>DELETE</button>
      </div>
    );
  }
  goDeleteComment = async =>
    api
      .deleteComment(this.props.article_id, this.props.comment_id)
      .then(data => {
        this.props.handleDeleteComment(this.props.comment_id, this.props.index);

        if (data === {}) {
          this.props.handleDeleteComment(
            this.props.comment_id,
            this.props.index
          );
          return `${this.props.comment_id} deleted`;
        }
      });
  handleErrors = err => {
    const errcontent = {
      errstatus: err.response.status,
      errMsg: err.response.data.msg
    };
    navigate("/error", {
      state: {
        errcontent,
        replace: false
      }
    });
  };
}

export default DeleteComment;
