import React, { Component } from "react";
import * as api from "../api";
import NewComment from "./NewComment";
import { handleErrors } from "../utils";
import DeleteComment from "./DeleteComment";

class Comments extends Component {
  state = { comments: [] };
  render() {
    // console.log(this.location.state);
    return (
      <div className="content">
        <NewComment
          article_id={this.props.article_id}
          user_id={this.props.user.user_id}
          handleAddComment={this.handleAddComment}
        />
        <h2>Comments for Article ID:{this.props.article_id}</h2>

        {this.state.comments.map((comment, index) => {
          return (
            <div key={comment.comment_id} className="comment-entry">
              <div className="comment">
                <p key={comment.comment_id}>{comment.body}</p>
                <div className="comment-foot">
                  {comment.author === this.props.user.username ? (
                    <div>
                      Comment Author: ME!!!
                      <DeleteComment
                        handleDeleteComment={this.handleDeleteComment}
                        comment_id={comment.comment_id}
                        index={index}
                        article_id={this.props.article_id}
                      />
                    </div>
                  ) : (
                    <div>Comment Author:{comment.author}</div>
                  )}

                  <div>Comment Created_at :{comment.created_at}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  handleAddComment = newComment => {
    console.log("in handle add comment");
    api
      .addNewComment(this.props.article_id, newComment, this.props.user.user_id)
      .then(newComm => {
        console.log(this.props.user);
        newComm.comment.author = this.props.user.username;
        this.setState(
          { comments: [...this.state.comments, newComm.comment] },
          () => {
            console.log(this.state.comments);
          }
        );
      })
      .catch(err => {
        handleErrors(err);
      });
  };

  handleDeleteComment = (comment_id, index) => {
    console.log("in handle delete comment");
    console.log(comment_id, index);
    const tmpComments = this.state.comments;
    tmpComments.splice(index, 1);
    console.log(tmpComments);
    this.setState({ comments: tmpComments });
  };

  componentDidMount() {
    api.fetchCommentsByArticle(this.props.article_id).then(comments => {
      this.setState(comments);
    });
  }
}

export default Comments;
