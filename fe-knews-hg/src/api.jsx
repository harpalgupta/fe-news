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

export const fetchAllTopics = async topic => {
  const url = `${BASEURL}/topics`;
  const { data } = await axios.get(url);
  return data;
};
