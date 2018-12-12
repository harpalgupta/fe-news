import axios from "axios";
const BASEURL = "https://knews-prod.herokuapp.com/api";

export const fetchArticles = async topic => {
  let url = "";
  if (topic) {
    url = `${BASEURL}/topics/${topic}/articles`;
  } else {
    url = `${BASEURL}/articles`;
  }
  const { data } = await axios.get(url);

  return data;
};

export const fetchAllTopics = async () => {
  const url = `${BASEURL}/topics`;
  const { data } = await axios.get(url);
  return data;
};

export const fetchCommentsByArticle = async article_id => {
  // /api/articles/:article_id/comments
  const url = `${BASEURL}/articles/${article_id}/comments`;
  const { data } = await axios.get(url);
  return data;
};
export const fetchArticleArticleID = async article_id => {
  // /api/articles/:article_id/comments
  const url = `${BASEURL}/articles/${article_id}`;
  const { data } = await axios.get(url);
  return data;
};

export const updateArticleVote = async (article_id, inc) => {
  const url = `${BASEURL}/articles/${article_id}`;
  const body = { inc_votes: inc };
  const { data } = await axios.patch(url, body);
  return data;
};
