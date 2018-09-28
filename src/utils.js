const colors = require(`colors`);

const coloring = (string, color = `grey`) => colors[color](string);

module.exports = {
  coloring
};
