const ping = require("./ping");
const breathe = require("./breathe");
const hug = require("./hug");
const reddit = require("./reddit");

module.exports = {
  ping,
  breathe,
  hug,
  ...reddit,
};
