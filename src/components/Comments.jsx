import React, { Component } from 'react';
import * as api from '../api';
import NewComment from './NewComment';
import { handleErrors } from '../utils';
import DeleteComment from './DeleteComment';
import Votes from './Votes';

class Comments extends Component {
  state = {
    comments: [],
    queryColumns: ['comment_id', 'votes', 'created_at', 'body', 'author']
  };

  render() {
    return (
      <div className="content">
        <NewComment
          article_id={this.props.article_id}
          user_id={this.props.user.user_id}
          handleAddComment={this.handleAddComment}
        />
        <h2>
Comments for Article ID:
          {this.props.article_id}
        </h2>
        <div className="comment-query">
          <label>Sort by</label>
          <select
            name="sort_by"
            id="sort_by"
            onChange={(event) => {
              this.handleQuery('sort_by', event.target.value);
            }}
          >
            <option key="all" value="">
              Default(created_at)
            </option>

            {this.state.queryColumns.map(column => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
          <div>
            <label>Sort Ascending/Descending</label>
            <select
              name="sort_ascending"
              id="sort_ascending"
              onChange={(event) => {
                this.handleQuery('sort_ascending', event.target.value);
              }}
            >
              <option key="sort_descending" value="false">
              descending
              </option>
              <option key="sort_ascending" value="true">
              ascending
              </option>
            </select>
          </div>


        </div>
        {this.state.comments.map((comment, index) => (
          <div key={comment.comment_id} className="comment-entry">

            <Votes
              type="comment"
              index={index}
              id={comment.comment_id}
              handleUpdateVotes={this.handleUpdateVotes}
              votes={comment.votes}
              author={comment.author}
              article_id={this.props.article_id}
              user={this.props.user}
            />

            <div className="comment">
              <p key={comment.comment_id}>{comment.body}</p>

            </div>
            <div className="comment-foot">
              {comment.author === this.props.user.username ? (
                <div className="foot-item">
                      Comment Author: ME!!!
                  <DeleteComment
                    handleDeleteComment={this.handleDeleteComment}
                    comment_id={comment.comment_id}
                    index={index}
                    article_id={this.props.article_id}
                  />
                </div>
              ) : (
                <div className="foot-item">
                  {' '}
Comment Author:
                  {comment.author}
                </div>
              )}

              <div className="foot-item">
Comment Created_at :
                {comment.created_at}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }


  handleUpdateVotes = (comment, index) => {
    const tmpComments = [...this.state.comments];
    tmpComments[index] = comment;
    this.setState({
      comments: [...tmpComments]
    });
  };

  handleAddComment = (newComment) => {
    api
      .addNewComment(this.props.article_id, newComment, this.props.user.user_id)
      .then((newComm) => {
        newComm.comment.author = this.props.user.username;
        this.setState(
          { comments: [newComm.comment, ...this.state.comments] }
        );
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  handleQuery = (queryItem, value) => {
    this.setState(
      { queries: { ...this.state.queries, [queryItem]: value } },
      () => {

      }
    );
  };

  handleDeleteComment = (comment_id, index) => {
    const tmpComments = this.state.comments;
    tmpComments.splice(index, 1);
    this.setState({ comments: tmpComments });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.queries !== this.state.queries) {
      api
        .fetchCommentsByArticle(this.props.article_id, this.state.queries)
        .then((comments) => {
          this.setState(comments);
        })
        .catch((err) => {
          handleErrors(err);
        });
    }
  }

  componentDidMount() {
    api.fetchCommentsByArticle(this.props.article_id).then((comments) => {
      this.setState(comments);
    });
  }
}

export default Comments;
