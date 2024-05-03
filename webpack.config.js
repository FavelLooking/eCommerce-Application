const path = require("path");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src/index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
};