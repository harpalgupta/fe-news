import React, { Component } from "react";
import * as api from "../api";

class Comments extends Component {
  state = { comments: [] };
  render() {
    // console.log(this.location.state);
    return (
      <div className="content">
        <h2>Comments for Article ID:{this.props.article_id}</h2>

        {this.state.comments.map(comment => {
          return <p key={comment.comment_id}>{comment.body}</p>;
        })}
      </div>
    );
  }

  componentDidMount() {
    api.fetchCommentsByArticle(this.props.article_id).then(comments => {
      this.setState(comments);
    });
  }
}

export default Comments;
