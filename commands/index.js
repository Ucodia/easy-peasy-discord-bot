const ping = require("./ping");
const breathe = require("./breathe");
const reddit = require("./reddit");

module.exports = {
  ping,
  breathe,
  ...reddit,
};
