const createRedditCommand = require("../utils/createRedditCommand");

module.exports = {
  cromch: createRedditCommand("cromch"),
  puppies: createRedditCommand("puppies"),
  catnip: createRedditCommand("catnip"),
};
