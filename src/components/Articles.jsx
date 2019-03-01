import React, { Component } from 'react';
import { Link } from '@reach/router';
import Dotdotdot from 'react-dotdotdot';
import * as api from '../api';

import { handleErrors } from '../utils';
import NewArticle from './NewArticle';
import DeleteArticle from './DeleteArticle';
import Votes from './Votes';


class Articles extends Component {
  state = {
    articles: [],
    topics: [],
    selectedTopic: '',
    votes: 0,
    sortby: '',

    newArticle: {},
    sort_ascending: 'true',
    queries: { p: 1 },
    sessionVotes: {},
    disableMoreButton: false
  };

  render() {
    return (
      <div className="content">
        <div className="new-article">
          <NewArticle
            handleAddArticle={this.handleAddArticle}
            user={this.props.user}
            topics={this.state.topics}
            handleTopic={this.handleTopic}
          />
        </div>
        {this.state.selectedTopic ? (
          <div>
            <h2>
Articles By Topic
              {this.state.selectedTopic}
            </h2>
          </div>
        ) : (
          <div>
            {' '}
            <h2>Articles</h2>
          </div>
        )}

        <div className="sort-bar">
          <select
            name="topicselector"
            id="topicselector"
            onChange={(event) => {
              this.handleTopic(event.target.value);
            }}
          >
            <option key="all" value="">
              all topics
            </option>

            {this.state.topics.map(topic => (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            ))}
          </select>

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
            <option key="article_id" value="article_id">
              article_id
            </option>
            <option key="title" value="title">
              title
            </option>
            <option key="votes" value="votes">
              votes
            </option>
            <option key="topics" value="topics">
              topic
            </option>
          </select>

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

        {this.state.articles.map((article, index) => (
          <div key={article.article_id}>
            {this.formatArticle(article, index)}
          </div>
        ))}
        <div className="moreButton">
          <button disabled={this.state.disableMoreButton} onClick={this.fetchMoreArticles}>More Articles</button>

        </div>
      </div>
    );
  }

  formatArticle = (article, index) => (
    <div key={article.article_id} className="article-entry">
      <div className="articletitle">{article.title}</div>

      <Votes
        article_id={article.article_id}
        type="article"
        votes={article.votes}
        index={index}
        handleUpdateVotes={this.handleUpdateVotes}
        user={this.props.user}
        author={article.author}
      />
      <div className="article">
        <Link
          key={`${article.article_id}article`}
          to={`/articles/${article.article_id}`}
        >
          <Dotdotdot
            clamp={5}
          >
            {article.body}

          </Dotdotdot>
        </Link>
      </div>

      <div key={article.article_id} className="article-foot">
        <div>
Comments:
          {article.comment_count}
        </div>
        {article.author === this.props.user.username ? (
          <div>
              ME!!!
            <DeleteArticle
              handleDeleteArticle={this.handleDeleteArticle}
              article_id={article.article_id}
              index={index}
            />
          </div>
        ) : (
          <div>
            {' '}
Author:
            {article.author}
          </div>
        )}
        <div>
          {' '}
Created_at:
          {article.created_at}
        </div>
      </div>
    </div>
  );

  handleTopic = (selectedTopic) => {
    this.setState({ selectedTopic });
  };

  handleQuery = (queryItem, value) => {
    this.setState(
      { queries: { ...this.state.queries, [queryItem]: value } }
    );
  };

  fetchMoreArticles = () => {
    // this.setState({ page: this.state.page + 1 });
    this.handleQuery('p', this.state.queries.p + 1);
  };

  handleAddArticle = (newArticle) => {
    api.addNewArticle(newArticle.topic, newArticle).then(({ article }) => {
      this.setState({ articles: [article, ...this.state.articles] });
    });
  };

  handleDeleteArticle = (article_id, index) => {
    const tmpArticles = this.state.articles;
    tmpArticles.splice(index, 1);
    this.setState({ articles: tmpArticles });
  };

  handleUpdateVotes = (article, index) => {
    const tmpArticles = [...this.state.articles];
    tmpArticles[index] = article;
    this.setState({
      articles: [...tmpArticles]
    });
  };

  storeUserVotes = (username, article_id, vote) => {
    this.setState(
      {
        sessionVotes: {
          ...this.state.sessionVotes,
          [username]: { article_id, vote }
        }
      }
    );
  };

  componentDidMount() {
    api
      .fetchAllTopics(this.state.selectedTopic)
      .then(topics => this.setState(topics));
    api.fetchArticles(this.state.selectedTopic).then((articles) => {
      this.setState({ ...articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.newArticle !== this.state.newArticle) {
      this.setState({
        articles: [...this.state.articles, this.state.newArticle]
      });
    }
    if (prevState.queries.p !== this.state.queries.p) {
      api
        .fetchArticles(this.state.selectedTopic, {
          p: this.state.queries.p
        })
        .then(({ articles }) => {
          this.setState(
            { articles: [...this.state.articles, ...articles] },
            () => {}
          );
        })
        .catch((err) => {
          this.setState({ disableMoreButton: true });
        });
    } else if (prevState.queries !== this.state.queries) {
      api
        .fetchArticles(this.state.selectedTopic, this.state.queries)
        .then(({ articles }) => {
          this.setState({ articles: [...articles] });
        })
        .catch((err) => {
          handleErrors(err);
        });
    }

    if (prevState.selectedTopic !== this.state.selectedTopic) {
      api.fetchArticles(this.state.selectedTopic).then((articles) => {
        this.setState({ ...articles }, () => {});
      });

      if (prevState.selectedTopic !== this.state.selectedTopic) {
        api.fetchArticles(this.state.selectedTopic).then((articles) => {
          this.setState({ ...articles }, () => {});
        });
      }
    }
  }
}

export default Articles;
