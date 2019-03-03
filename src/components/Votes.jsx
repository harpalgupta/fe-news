import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import * as api from '../api';

class Votes extends Component {
  state={
    sessionVote: 0
  }


  goUpdateCommentVotes = (vote) => {
    const {
      handleUpdateVotes, article_id, author, id, index
    } = this.props;
    api
      .updateCommentVote(article_id, id, vote)
      .then((tmpComment) => {
        const comment = tmpComment;
        comment.author = author;
        handleUpdateVotes(comment, index);
        // this.setState({ votes: this.state.votes + 1 });
      });
  };

  goUpdateArticleVotes = (vote) => {
    const { article_id, index, handleUpdateVotes } = this.props;
    api.updateArticleVote(article_id, vote).then((article) => {
      handleUpdateVotes(article, index);
    });
  };


  render() {
    const {

      votes,
      article_id,
      type,
      user,
      author,
      id

    } = this.props;
    const { sessionVote } = this.state;
    return (
      <div className="vote">
        <button
          type="button"
          key={`${id}UP`}
          className="votearrow vote-up"
          disabled={user.username === author || sessionVote === 1}
          onClick={() => {
            if (type === 'comment') {
              this.goUpdateCommentVotes(1);
              this.setState({ sessionVote: sessionVote + 1 });
            } else {
              this.goUpdateArticleVotes(1);
              this.setState({ sessionVote: sessionVote + 1 });
            }
          }}
        >
          {' '}
          <FontAwesomeIcon icon={faArrowUp}>voteUp</FontAwesomeIcon>
        </button>
        Votes:
        {votes}
        <button
          type="button"
          key={`${article_id}Down`}
          className="votearrow vote-down"
          disabled={user.username === author || sessionVote === -1 || votes <= 0}
          onClick={() => {
            if (type === 'comment') {
              this.goUpdateCommentVotes(-1);
              this.setState({ sessionVote: sessionVote - 1 });
            } else {
              this.goUpdateArticleVotes(-1);
              this.setState({ sessionVote: sessionVote - 1 });
            }
          }}
        >
          {' '}
          <FontAwesomeIcon icon={faArrowDown}>voteDown</FontAwesomeIcon>
        </button>
        <div />
      </div>
    );
  }
}
export default Votes;
