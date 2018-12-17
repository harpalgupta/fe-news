import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as api from "../api";

import React, { Component } from "react";

class Votes extends Component {
  state = {
    storeUserVotes: {}
  };
  render() {
    const {
      article,
      index,
      handleUpdateVotes,
      type,
      comment,
      storeUserVotes
    } = this.props;
    if (type === "article") {
      return (
        <div className="vote">
          <button
            key={`${article.article_id}UP`}
            className="votearrow"
            // disabled={
            //   this.state.storeUserVotes.article[article.article_id] === 1
            //     ? 1
            //     : 0
            // }
            onClick={() => {
              api.updateArticleVote(article.article_id, 1).then(article => {
                handleUpdateVotes(article, index);

                storeUserVotes(this.props.username, this.props.article_id, 1);

                this.setState({ storeUserVotes: { [article.article_id]: 1 } });
              });
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faArrowUp}>voteUp</FontAwesomeIcon>
          </button>
          Votes:{article.votes}
          <button
            key={`${article.article_id}Down`}
            className="votearrow"
            onClick={() => {
              api.updateArticleVote(article.article_id, -1).then(article => {
                handleUpdateVotes(article, index);
              });
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faArrowDown}>voteDown</FontAwesomeIcon>
          </button>
          <div />
        </div>
      );
    } else if (type === "comment") {
      console.log("comment vote section", comment);
      return (
        <div className="vote">
          <button
            key={`${comment.comment_id}UP`}
            className="votearrow"
            onClick={() => {
              api
                .updateCommentVote(this.props.article_id, comment.comment_id, 1)
                .then(comment => {
                  comment.author = this.props.comment.author;
                  handleUpdateVotes(comment, index);
                  // this.setState({ votes: this.state.votes + 1 });
                });
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faArrowUp}>voteUp</FontAwesomeIcon>
          </button>
          Votes:{comment.votes}
          <button
            key={`${comment.article_id}Down`}
            className="votearrow"
            onClick={() => {
              api
                .updateCommentVote(
                  this.props.article_id,
                  comment.comment_id,
                  -1
                )
                .then(comment => {
                  comment.author = this.props.comment.author;
                  handleUpdateVotes(comment, index);
                });
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faArrowDown}>voteDown</FontAwesomeIcon>
          </button>
          <div />
        </div>
      );
    }
    return <div />;
  }
  componentDidMount() {
    // console.log("votes loaded", this.props.article.article_id);
    // const tmpStoreVote = { [this.props.article.article_id]: 0 };
    // this.setState(
    //   {
    //     storeUserVotes: { ...this.state.storeUserVotes, tmpStoreVote }
    //   },
    //   () => console.log(this.state)
    // );
  }
  // componentWillReceiveProps(props) {
  //   this.setState({ username: props.user.username });
  // }
}

export default Votes;
