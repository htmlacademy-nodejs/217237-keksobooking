const {license} = require(`../../package.json`);

module.exports = {
  name: `license`,
  command: `--license`,
  description: `Shows program license`,
  execute() {
    return license;
  }
};
