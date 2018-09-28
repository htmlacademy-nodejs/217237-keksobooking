const {license} = require(`../../package.json`);

module.exports = {
  name: `--license`,
  description: `Shows program license`,
  execute() {
    return license;
  }
};
