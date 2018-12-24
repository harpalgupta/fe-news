import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as api from "../api";
import React, { Component } from "react";

class Votes2 extends Component {
  render() {
    const {
    
      votes,
      article_id,
      type
    } = this.props;
    return (
      <div className="vote">
        <button
          key={`${this.props.id}UP`}
          className="votearrow"
          onClick={() => {
            type === "comment"
              ? this.goUpdateCommentVotes(1)
              : this.goUpdateArticleVotes(1);
          }}
        >
          {" "}
          <FontAwesomeIcon icon={faArrowUp}>voteUp</FontAwesomeIcon>
        </button>
        Votes:{votes}
        <button
          key={`${article_id}Down`}
          className="votearrow"
          onClick={() => {
            type === "comment"
              ? this.goUpdateCommentVotes(-1)
              : this.goUpdateArticleVotes(-1);
          }}
        >
          {" "}
          <FontAwesomeIcon icon={faArrowDown}>voteDown</FontAwesomeIcon>
        </button>
        <div />
      </div>
    );
  }

  goUpdateCommentVotes = vote => {
    api
      .updateCommentVote(this.props.article_id, this.props.id, vote)
      .then(comment => {
        comment.author = this.props.author;
        this.props.handleUpdateVotes(comment, this.props.index);
        // this.setState({ votes: this.state.votes + 1 });
      });
    console.log("updatecommentvotes");
  };

  goUpdateArticleVotes = vote => {
    api.updateArticleVote(this.props.article_id, vote).then(article => {
      this.props.handleUpdateVotes(article, this.props.index);

    });
  };
}

export default Votes2;
