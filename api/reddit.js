const { setup } = require("axios-cache-adapter");

const api = setup({
  baseURL: "https://www.reddit.com/r",
  cache: {
    maxAge: 15 * 60 * 1000,
    exclude: {
      query: false,
    },
  },
});

const getTop = async (subreddit) => {
  const response = await api.get(`/${subreddit}/top.json?t=all&limit=100`);
  return response.data.data.children;
};

const getHot = async (subreddit) => {
  const response = await api.get(`/${subreddit}/hot.json?t=all&limit=100`);
  return response.data.data.children;
};

const getRandom = async (subreddit) => {
  const response = await api.get(`${BASE_URI}/${subreddit}/random.json?`);
  return response.data[0].data.children[0];
};

module.exports = { getTop, getHot, getRandom };
