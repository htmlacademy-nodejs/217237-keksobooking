const {name} = require(`../../package.json`);
const {coloring} = require(`../utils`);

module.exports = {
  name: `--name`,
  description: `Shows program name`,
  execute: () => coloring(name, `green`)
};
