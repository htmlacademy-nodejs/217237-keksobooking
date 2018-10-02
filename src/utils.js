const colors = require(`colors`);

const coloring = (string, color = `grey`) => colors[color](string);

const findObjectInArray = (arr, key, value) => arr.find((item) => item[key] === value);

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const generateRandomArray = (array) => {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    result.push(array[getRandomInteger(0, array.length - 1)]);
  }

  return [...new Set(result)];
};

module.exports = {
  coloring,
  findObjectInArray,
  getRandomInteger,
  generateRandomArray
};
