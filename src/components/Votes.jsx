import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import * as api from '../api';

class Votes extends Component {
  state={
    sessionVote: 0
  }

  render() {
    const {

      votes,
      article_id,
      type,
      user,
      author,
      currentVote
    } = this.props;
    console.log(currentVote);
    return (
      <div className="vote">
        <button
          key={`${this.props.id}UP`}
          className="votearrow"
          disabled={user.username === author || this.state.sessionVote === 1}
          onClick={() => {
            if (type === 'comment') {
              this.goUpdateCommentVotes(1);
              this.setState({ sessionVote: this.state.sessionVote + 1 });
            } else {
              this.goUpdateArticleVotes(1);
              this.setState({ sessionVote: this.state.sessionVote + 1 });
            }
          }}
        >
          {' '}
          <FontAwesomeIcon icon={faArrowUp}>voteUp</FontAwesomeIcon>
        </button>
        Votes:
        {votes}
        <button
          key={`${article_id}Down`}
          className="votearrow"
          disabled={user.username === author || this.state.sessionVote === -1 || votes <= 0}
          onClick={() => {
            if (type === 'comment') {
              this.goUpdateCommentVotes(-1);
              this.setState({ sessionVote: this.state.sessionVote - 1 });
            } else {
              this.goUpdateArticleVotes(-1);
              this.setState({ sessionVote: this.state.sessionVote - 1 });
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

  goUpdateCommentVotes = (vote) => {
    api
      .updateCommentVote(this.props.article_id, this.props.id, vote)
      .then((comment) => {
        comment.author = this.props.author;
        this.props.handleUpdateVotes(comment, this.props.index);
        // this.setState({ votes: this.state.votes + 1 });
      });
  };

  goUpdateArticleVotes = (vote) => {
    api.updateArticleVote(this.props.article_id, vote).then((article) => {
      this.props.handleUpdateVotes(article, this.props.index);
    });
  };
}

export default Votes;
