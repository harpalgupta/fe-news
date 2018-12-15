import React, { Component } from "react";
import { navigate } from "@reach/router";
import * as api from "../api";
import { handleErrors } from "../utils";

class DeleteArticle extends Component {
  state = { output: "", errMsg: {} };
  render() {
    return (
      <div>
        <button onClick={this.goDeleteArticle}>DELETE</button>
      </div>
    );
  }
  goDeleteArticle = async =>
    api
      .deleteArticle(this.props.article_id)
      .then(data => {
        this.props.handleDeleteArticle(this.props.article_id, this.props.index);

        if (data === {}) {
          this.props.handleDeleteArticle(
            this.props.article_id,
            this.props.index
          );
          return `${this.props.article_id} deleted`;
        }
      })
      .catch(err => {
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
