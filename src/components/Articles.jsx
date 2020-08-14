import React, { Component } from 'react';
import * as api from '../api';

import { handleErrors } from '../utils';
import NewArticle from './NewArticle';
import FormattedArticle from './FormattedArticle';

class Articles extends Component {
  state = {
    articles: [],
    topics: [],
    selectedTopic: '',
    newArticle: {},
    queries: { p: 1 },
    disableMoreButton: false
  };

  componentDidMount() {
    const { selectedTopic } = this.state;
    api.fetchAllTopics(selectedTopic).then(topics => this.setState(topics));
    api.fetchArticles(selectedTopic).then((articles) => {
      this.setState({ ...articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      newArticle, queries, selectedTopic,
    } = this.state;

    if (prevState.newArticle !== newArticle) {
      this.setState({
        articles: [...prevState.articles, newArticle]
      });
    }
    if (prevState.queries.p !== queries.p) {
      api
        .fetchArticles(selectedTopic, {
          p: queries.p
        })
        .then(({ articles }) => {
          this.setState(
            { articles: [...prevState.articles, ...articles] },
            () => { }
          );
        })
        .catch((err) => {
          if (err) this.setState({ disableMoreButton: true });
        });
    } else if (prevState.queries !== queries) {
      api
        .fetchArticles(selectedTopic, queries)
        .then(({ articles }) => {
          this.setState({ articles: [...articles] });
        })
        .catch((err) => {
          handleErrors(err);
        });
    }

    if (prevState.selectedTopic !== selectedTopic) {
      api.fetchArticles(selectedTopic).then((articles) => {
        this.setState({ ...articles }, () => { });
      });
    }
  }

  handleTopic = (selectedTopic) => {
    this.setState({ selectedTopic });
  };

  handleQuery = (queryItem, value) => {
    const { queries } = this.state;
    this.setState({ queries: { ...queries, [queryItem]: value } });
  };

  fetchMoreArticles = () => {
    const { queries } = this.state;
    // this.setState({ page: this.state.page + 1 });
    this.handleQuery('p', queries.p + 1);
  };

  handleAddArticle = (newArticle, username) => {
    const { articles } = this.state;

    api.addNewArticle(newArticle.topic, newArticle).then((tmpArticle) => {
      const { article } = tmpArticle;
      article.author = username;
      this.setState({ articles: [article, ...articles] }, () => { });
    });
  };

  handleDeleteArticle = (article_id, index) => {
    const { articles } = this.state;
    const tmpArticles = articles;
    tmpArticles.splice(index, 1);
    this.setState({ articles: tmpArticles });
  };

  handleUpdateVotes = (tmparticle, index) => {
    const { articles } = this.state;
    const tmpArticles = articles;
    tmpArticles[index].votes = tmparticle.votes;

    this.setState({
      articles: [...tmpArticles]
    });
  };

  render() {
    const { user } = this.props;
    const {
      topics, selectedTopic, articles, disableMoreButton
    } = this.state;
    return (
      <div className="row">
        <div className="col-sm-1" />
        <div className="col-sm-10 pt-5 pb-2">
          <div className="new-article">
            <NewArticle
              handleAddArticle={this.handleAddArticle}
              user={user}
              topics={topics}
              handleTopic={this.handleTopic}
            />
          </div>
          {selectedTopic ? (
            <div>
              <h2>
              Articles By
                {' '}
                {selectedTopic}
                {' '}
Topic
              </h2>
            </div>
          ) : (
            <div>
              {' '}
              <h2>Articles</h2>
              <div className="card bg-secondary">
                <div className="card-body p-1" />

                <div className="row">

                  <div className="col-md-3 col-sm-3">
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

                      {topics.map(topic => (
                        <option key={topic.slug} value={topic.slug}>
                          {topic.slug}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-5 col-sm-9">
                    <label>Sort by</label>
                    <select
                      name="sort_by"
                      id="sort_by"
                      onChange={(event) => {
                        this.handleQuery('sort_by', event.target.value);
                      }}
                    >
                      <option key="all" value="">
              Created Date
                      </option>
                      <option key="title" value="title">
              Title
                      </option>
                      <option key="votes" value="votes">
              Votes
                      </option>
                      <option key="topics" value="topics">
              Topic
                      </option>
                    </select>
                  </div>


                  <div className="col-md-4 col-sm-12 text-left">
                    <label>Sort</label>
                    <select
                      name="sort_ascending"
                      id="sort_ascending"
                      onChange={(event) => {
                        this.handleQuery('sort_ascending', event.target.value);
                      }}
                    >
                      <option key="sort_descending" value="false">
              Descending
                      </option>
                      <option key="sort_ascending" value="true">
              Ascending
                      </option>
                    </select>
                  </div>
                </div>

              </div>
              <div className="article-list">
                {articles.map((article, index) => (
                  <div className="" key={article.article_id}>
                    {FormattedArticle(false, article, index, user,
                      this.handleUpdateVotes, this.handleDeleteArticle)}
                  </div>
                ))}
                <div />
              </div>
              <button
                className="moreButton"
                type="button"
                disabled={disableMoreButton}
                onClick={this.fetchMoreArticles}
              >
          More Articles
              </button>
            </div>
          )}
          <div />

        </div>
      </div>
    );
  }
}

export default Articles;
