const {author} = require(`../../package.json`);

module.exports = {
  name: `author`,
  command: `--author`,
  description: `Shows program author`,
  execute() {
    return author;
  }
};
