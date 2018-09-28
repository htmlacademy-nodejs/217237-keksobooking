const colors = require(`colors`);

const coloring = (string, color = `grey`) => colors[color](string);

const findObjectInArray = (arr, key, value) => arr.find((item) => item[key] === value);

module.exports = {
  coloring,
  findObjectInArray
};
