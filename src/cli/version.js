const {version} = require(`../../package.json`);
const {coloring} = require(`../utils`);

module.exports = {
  name: `version`,
  command: `--version`,
  description: `Shows program version`,
  execute() {
    return `v${coloring(version.split(`.`)[0], `red`)}.${coloring(version.split(`.`)[1], `green`)}.${coloring(version.split(`.`)[2], `blue`)}`;
  }
};
