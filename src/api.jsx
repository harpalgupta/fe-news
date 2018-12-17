import axios from "axios";
const BASEURL = "https://knews-prod.herokuapp.com/api";

export const fetchArticles = async (topic, queries) => {
  //const { sortby } = params.sortby;
  let url = "";
  let queryStr = "";

  if (topic) {
    url = `${BASEURL}/topics/${topic}/articles`;
  } else {
    url = `${BASEURL}/articles`;
  }
  if (queries) {
    queryStr = "?";
    for (let query in queries) {
      queryStr += `${query}=${queries[query]}&`;
    }

    url += queryStr;
    url = url.replace(/\&$/, "");

    console.log(url);
  }
  const { data } = await axios.get(url);
  return data;
};

export const fetchAllTopics = async () => {
  const url = `${BASEURL}/topics`;
  const { data } = await axios.get(url);
  return data;
};
export const checkUserValid = async username => {
  const url = `${BASEURL}/users/${username}`;
  const { data } = await axios.get(url);
  return data;
};

export const fetchCommentsByArticle = async (article_id, queries) => {
  // /api/articles/:article_id/comments
  let url = `${BASEURL}/articles/${article_id}/comments`;
  let queryStr = "";
  if (queries) {
    queryStr = "?";
    for (let query in queries) {
      queryStr += `${query}=${queries[query]}&`;
    }

    url += queryStr;
    url = url.replace(/\&$/, "");
  }

  const { data } = await axios.get(url);
  return data;
};
export const fetchArticleArticleID = async article_id => {
  // /api/articles/:article_id/comments
  const url = `${BASEURL}/articles/${article_id}`;
  const { data } = await axios.get(url);
  return data;
};

export const updateVotes = async (type, article_id, inc, comment_id) => {
  if (type === "article") {
    const url = `${BASEURL}/articles/${article_id}`;
    const body = { inc_votes: inc };
    const { data } = await axios.patch(url, body);
    return data;
  } else if (type === "comment") {
    const url = `${BASEURL}/articles/${article_id}/comments/${comment_id}`;
    const body = { inc_votes: inc };
    const { data } = await axios.patch(url, body);
    return data;
  }
};
export const updateArticleVote = async (article_id, inc) => {
  const url = `${BASEURL}/articles/${article_id}`;
  const body = { inc_votes: inc };
  const { data } = await axios.patch(url, body);
  return data;
};
export const updateCommentVote = async (article_id, comment_id, inc) => {
  const url = `${BASEURL}/articles/${article_id}/comments/${comment_id}`;
  const body = { inc_votes: inc };
  const { data } = await axios.patch(url, body);
  return data;
};

export const addNewArticle = async (topic, newArticle) => {
  ///api/topics/cats/articles
  const url = `${BASEURL}/topics/${topic}/articles/`;

  const { data } = await axios.post(url, newArticle);
  console.log("add new article data back", data);
  return data;
};

export const deleteArticle = async article_id => {
  ///api/topics/cats/articles
  console.log("in api delete article");
  const url = `${BASEURL}/articles/${article_id}`;
  const everything = await axios.delete(url, { params: {} });
  console.log(everything.error);
  return everything.data;
};

export const addNewComment = async (article_id, body, user_id) => {
  console.log("in add new comment");
  ///api/topics/cats/articles
  const newComment = { user_id, body };
  const url = `${BASEURL}/articles/${article_id}/comments`;

  const { data } = await axios.post(url, newComment);
  return data;
};

export const deleteComment = async (article_id, comment_id) => {
  ///api/topics/cats/articles
  console.log("in api delete comment");
  const url = `${BASEURL}/articles/${article_id}/comments/${comment_id}`;
  const everything = await axios.delete(url, { params: {} });
  console.log(everything.error);
  return everything.data;
};

export const getUsers = async () => {
  const url = `${BASEURL}/users`;
  const { data } = await axios.get(url);
  return data;
};
