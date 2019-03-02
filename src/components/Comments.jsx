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

  componentDidMount() {
    const { article_id } = this.props;
    api.fetchCommentsByArticle(article_id).then((comments) => {
      this.setState(comments);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { queries } = this.state;
    const { article_id } = this.props;
    if (prevState.queries !== queries) {
      api
        .fetchCommentsByArticle(article_id, queries)
        .then((comments) => {
          this.setState(comments);
        })
        .catch((err) => {
          handleErrors(err);
        });
    }
  }

  handleUpdateVotes = (comment, index) => {
    const { comments } = this.state;
    const tmpComments = [...comments];
    tmpComments[index] = comment;
    this.setState({
      comments: [...tmpComments]
    });
  };

  handleAddComment = (newComment) => {
    const { article_id, user } = this.props;
    const { comments } = thsis.state;
    api
      .addNewComment(article_id, newComment, user.user_id)
      .then((newComm) => {
        newComm.comment.author = user.username;
        this.setState(
          { comments: [newComm.comment, ...comments] }
        );
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  handleQuery = (queryItem, value) => {
    const { queries } = this.state;
    this.setState(
      { queries: { ...queries, [queryItem]: value } },
      () => {

      }
    );
  };

  handleDeleteComment = (comment_id, index) => {
    const { comments } = this.state;
    const tmpComments = comments;
    tmpComments.splice(index, 1);
    this.setState({ comments: tmpComments });
  };


  render() {
    const { article_id, user } = this.props;
    const { queryColumns, comments } = this.state;
    return (
      <div className="content">
        <NewComment
          article_id={article_id}
          user_id={user.user_id}
          handleAddComment={this.handleAddComment}
        />
        <h2>
Comments for Article ID:
          {article_id}
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

            {queryColumns.map(column => (
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
        {comments.map((comment, index) => (
          <div key={comment.comment_id} className="comment-entry">

            <Votes
              type="comment"
              index={index}
              id={comment.comment_id}
              handleUpdateVotes={this.handleUpdateVotes}
              votes={comment.votes}
              author={comment.author}
              article_id={article_id}
              user={user}
            />

            <div className="comment">
              <p key={comment.comment_id}>{comment.body}</p>

            </div>
            <div className="comment-foot">
              {comment.author === user.username ? (
                <div className="foot-item">
                      Comment Author: ME!!!
                  <DeleteComment
                    handleDeleteComment={this.handleDeleteComment}
                    comment_id={comment.comment_id}
                    index={index}
                    article_id={article_id}
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
}

export default Comments;
