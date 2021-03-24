const axios = require("axios");

const BASE_URI = "https://www.reddit.com/r";
const unwrapResponse = (response) => response.data.data.children;

const getTop = async (subreddit) => {
  const response = await axios.get(
    `${BASE_URI}/${subreddit}/top.json?t=all&limit=100`
  );
  return unwrapResponse(response);
};

const getHot = async (subreddit) => {
  const response = await axios.get(
    `${BASE_URI}/${subreddit}/hot.json?t=all&limit=100`
  );
  return unwrapResponse(response);
};

const getRandom = async (subreddit) => {
  const response = await axios.get(`${BASE_URI}/${subreddit}/random.json?`);
  return response.data[0].data.children[0];
};

module.exports = { getTop, getHot, getRandom };
