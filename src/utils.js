const colors = require(`colors`);

const coloring = (string, color = `grey`) => colors[color](string);

const findObjectInArray = (arr, key, value) => arr.find((item) => item[key] === value);

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

module.exports = {
  coloring,
  findObjectInArray,
  getRandomInteger
};
