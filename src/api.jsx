import axios from "axios";
const BASEURL = "https://knews-prod.herokuapp.com/api";

export const fetchArticles = async (topic, queries) => {
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
    url = url.replace(/&$/, "");

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
  let url = `${BASEURL}/articles/${article_id}/comments`;
  let queryStr = "";
  if (queries) {
    queryStr = "?";
    for (let query in queries) {
      queryStr += `${query}=${queries[query]}&`;
    }

    url += queryStr;
    url = url.replace(/&$/, "");
  }

  const { data } = await axios.get(url);
  return data;
};
export const fetchArticleArticleID = async article_id => {
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
  const url = `${BASEURL}/topics/${topic}/articles/`;

  const { data } = await axios.post(url, newArticle);
  return data;
};

export const deleteArticle = async article_id => {

  const url = `${BASEURL}/articles/${article_id}`;
  const everything = await axios.delete(url, { params: {} });

  return everything.data;
};

export const addNewComment = async (article_id, body, user_id) => {


  const newComment = { user_id, body };
  const url = `${BASEURL}/articles/${article_id}/comments`;

  const { data } = await axios.post(url, newComment);
  return data;
};

export const deleteComment = async (article_id, comment_id) => {

  const url = `${BASEURL}/articles/${article_id}/comments/${comment_id}`;
  const everything = await axios.delete(url, { params: {} });

  return everything.data;
};

export const getUsers = async () => {
  const url = `${BASEURL}/users`;
  const { data } = await axios.get(url);
  return data;
};
