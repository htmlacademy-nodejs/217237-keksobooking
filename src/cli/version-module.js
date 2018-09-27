const {version} = require(`../../package.json`);

module.exports = {
  name: `version`,
  description: `Shows program version`,
  execute() {
    return version
  }
};
