const {description} = require(`../../package.json`);

module.exports = {
  name: `description`,
  command: `--description`,
  description: `Shows program description`,
  execute() {
    return description;
  }
};
