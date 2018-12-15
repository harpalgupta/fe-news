import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleErrors } from "../utils";
import NewArticle from "./NewArticle";
import TopicSelector from "./TopicSelector";
import DeleteArticle from "./DeleteArticle";

// import { formatArticle } from "../utils";

class Articles extends Component {
  state = {
    loggedInAs: "",
    articles: [],
    topics: [],
    selectedTopic: "",
    votes: 0,
    sortby: "",
    p: 1,
    newArticle: {},
    sort_ascending: "true",
    queries: {}
  };

  render() {
    console.log("app render");
    return (
      <div className="content">
        <NewArticle
          handleAddArticle={this.handleAddArticle}
          user={this.props.user}
          topics={this.state.topics}
          handleTopic={this.handleTopic}
        />
        {this.state.selectedTopic ? (
          <div>
            <h2>Articles By Topic {this.state.selectedTopic}</h2>
          </div>
        ) : (
          <div>
            {" "}
            <h2>Articles</h2>
          </div>
        )}
        <select
          name="topicselector"
          id="topicselector"
          onChange={event => {
            this.handleTopic(event.target.value);
          }}
        >
          <option key="all" value="">
            all topics
          </option>

          {this.state.topics.map(topic => {
            //  console.log(article);
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
        {/* <TopicSelector
          handleTopic={this.handleTopic}
          topics={this.state.topics}
        /> */}
        <label>Sort by</label>
        <select
          name="sort_by"
          id="sort_by"
          onChange={event => {
            this.handleQuery("sort_by", event.target.value);
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
          onChange={event => {
            this.handleQuery("sort_ascending", event.target.value);
          }}
        >
          <option key="sort_descending" value="false">
            descending
          </option>
          <option key="sort_ascending" value="true">
            ascending
          </option>
        </select>
        {this.state.articles.map((article, index) => {
          console.log("articlein map ", article);
          return (
            <div key={article.article_id}>
              {this.formatArticle(article, index)}
            </div>
          );
        })}

        <button onClick={this.fetchMoreArticles}>More</button>
      </div>
    );
  }

  formatArticle = (article, index) => {
    console.log("article in format article pre touched ", article);
    return (
      <div key={article.article_id} className="article-entry">
        <div className="articletitle">{article.title}</div>
        <div className="vote">
          <button
            key={`${article.article_id}UP`}
            className="votearrow"
            onClick={() => {
              api.updateArticleVote(article.article_id, 1).then(article => {
                const tmpArticles = [...this.state.articles];
                tmpArticles[index] = article;
                this.setState({
                  articles: [...tmpArticles]
                });
                // this.setState({ votes: this.state.votes + 1 });
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
                const tmpArticles = [...this.state.articles];
                tmpArticles[index] = article;
                this.setState({
                  articles: [...tmpArticles]
                });
                // this.setState({ votes: this.state.votes + 1 }, () => {
                //   console.log(this.state);
                // });
              });
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faArrowDown}>voteDown</FontAwesomeIcon>
          </button>
          <div />
        </div>

        <div className="article">
          <Link
            key={`${article.article_id}article`}
            // state={{ article: article }}
            to={`/article/${article.article_id}`}
          >
            {article.body}
          </Link>
        </div>

        <div key={article.article_id} className="article-foot">
          <div>Comments:{article.comment_count}</div>
          {article.author === this.props.loggedInAs ? (
            <div>
              ME!!!
              <DeleteArticle
                handleDeleteArticle={this.handleDeleteArticle}
                article_id={article.article_id}
                index={index}
              />
            </div>
          ) : (
            <div> Author:{article.author}</div>
          )}
          <div> Created_at:{article.created_at}</div>
        </div>
      </div>
    );
  };

  handleTopic = selectedTopic => {
    this.setState({ selectedTopic: selectedTopic });
  };
  handleQuery = (queryItem, value) => {
    this.setState(
      { queries: { ...this.state.queries, [queryItem]: value } },
      () => {
        console.log(this.state.queries);
      }
    );
  };

  fetchMoreArticles = () => {
    //this.setState({ page: this.state.page + 1 });
    this.handleQuery("p", this.state.p + 1);
  };

  handleAddArticle = newArticle => {
    console.log("<<<<<<<<<<<<<", newArticle);

    api.addNewArticle(newArticle.topic, newArticle).then(({ article }) => {
      this.setState({ articles: [article, ...this.state.articles] }, () => {
        console.log(this.state);
      });
    });
  };

  handleDeleteArticle = (article_id, index) => {
    console.log("in handle delete article");
    console.log(article_id, index);
    const tmpArticles = this.state.articles;
    tmpArticles.splice(index, 1);
    console.log(tmpArticles);
    this.setState({ articles: tmpArticles });
    // article.author = this.props.user.username;
    // article.comment_count = 0;
    // const formattedArticle = this.formatArticle(article);
    // console.log(formattedArticle);
    // this.setState({ articles: [article, ...this.state.articles] }, () => {});
  };

  componentDidMount() {
    console.log("mount");

    api
      .fetchAllTopics(this.state.selectedTopic)
      .then(topics => this.setState(topics));
    api.fetchArticles(this.state.selectedTopic).then(articles => {
      this.setState({ ...articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.newArticle !== this.state.newArticle) {
      this.setState({
        articles: [...this.state.articles, this.state.newArticle]
      });
    }
    if (prevState.queries !== this.state.queries) {
      api
        .fetchArticles(this.state.selectedTopic, this.state.queries)
        .then(({ articles }) => {
          //console.log(articles);
          this.setState({ articles: [...articles] }, () => {
            console.log(this.state);
          });
        })
        .catch(err => {
          handleErrors(err);
        });
    }
    // if (
    //   prevState.queries.sort_ascending !== this.state.queries.sort_ascending
    // ) {
    //   api
    //     .fetchArticles(this.state.selectedTopic, {
    //       sort_ascending: this.state.queries.sort_ascending
    //     })
    //     .then(({ articles }) => {
    //       console.log(articles);
    //       this.setState(
    //         { articles: [...this.state.articles, ...articles] },
    //         () => {}
    //       );
    //     })
    //     .catch(err => {
    //       handleErrors(err);
    //     });
    // }
    // // if (prevState.queries.sortby !== this.state.queries.sortby) {
    //   console.log("detected new sort");
    //   api
    //     .fetchArticles(this.state.selectedTopic, {
    //       sortby: this.queries.state.sortby
    //     })
    //     .then(({ articles }) => {
    //       this.setState({ ...articles }, () => {});
    //     });
    // }
    // if (prevState.queries.p !== this.state.queries.p) {
    //   console.log("detected new page");
    //   api
    //     .fetchArticles(this.state.selectedTopic, {
    //       p: this.state.queries.p
    //     })
    //     .then(({ articles }) => {
    //       console.log(articles);
    //       this.setState(
    //         { articles: [...this.state.articles, ...articles] },
    //         () => {}
    //       );
    //     })
    //     .catch(err => {
    //       handleErrors(err);
    //     });
    // }
    if (prevState.selectedTopic !== this.state.selectedTopic) {
      api.fetchArticles(this.state.selectedTopic).then(articles => {
        this.setState({ ...articles }, () => {});
      });

      if (prevState.selectedTopic !== this.state.selectedTopic) {
        api.fetchArticles(this.state.selectedTopic).then(articles => {
          this.setState({ ...articles }, () => {});
        });
      }
    }
  }
}

export default Articles;
