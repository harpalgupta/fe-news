import React, { Component } from "react";
import { navigate } from "@reach/router";
import * as api from "../api";
import { handleErrors } from "../utils";

class DeleteArticle extends Component {
  state = { output: "", errMsg: {} };
  render() {
    const { article_id } = this.props;
    this.goDeleteArticle(article_id)
      .then(output => {
        // this.setState({ output });
        // console.dir(output);
      })
      .catch(err => {
        handleErrors(err);
      });

    return (
      <div>
        {this.state.output === {} ? (
          <div>will try and delete... article with article id:{article_id}</div>
        ) : (
          <div> </div>
        )}

        <div>{}</div>
      </div>
    );
  }
  goDeleteArticle = async article_id =>
    api.deleteArticle(article_id).then(data => {
      if (data === {}) {
        return `${article_id} deleted`;
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

export default DeleteArticle;
