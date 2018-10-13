const {version} = require(`../../package.json`);
const {coloring} = require(`../utils`);

const [major, minor, patch] = version.split(`.`);

module.exports = {
  name: `--version`,
  description: `Shows program version`,
  execute: () => `v${coloring(major, `red`)}.${coloring(minor, `green`)}.${coloring(patch, `blue`)}`
};
