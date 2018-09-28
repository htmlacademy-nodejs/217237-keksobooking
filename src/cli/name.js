const {name} = require(`../../package.json`);

module.exports = {
  name: `name`,
  command: `--name`,
  description: `Shows program name`,
  execute() {
    return name;
  }
};
