const axios = require("axios");
const AxiosCacheAdapter = require("axios-cache-adapter");

const cache = AxiosCacheAdapter.setupCache({
  maxAge: 15 * 60 * 1000,
});
const api = axios.create({
  adapter: cache.adapter,
});

const BASE_URI = "https://www.reddit.com/r";
const unwrapResponse = (response) => response.data.data.children;

const getTop = async (subreddit) => {
  const response = await api.get(
    `${BASE_URI}/${subreddit}/top.json?t=all&limit=100`
  );
  return unwrapResponse(response);
};

const getHot = async (subreddit) => {
  const response = await api.get(
    `${BASE_URI}/${subreddit}/hot.json?t=all&limit=100`
  );
  return unwrapResponse(response);
};

const getRandom = async (subreddit) => {
  const response = await api.get(`${BASE_URI}/${subreddit}/random.json?`);
  return response.data[0].data.children[0];
};

module.exports = { getTop, getHot, getRandom };
