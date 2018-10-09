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

const getContentType = (ext) => {
  switch (ext) {
    case (`.css`):
      return `text/css`;
    case (`.html`):
      return `text/html; charset=UTF-8`;
    case (`.jpg`):
      return `image/jpeg`;
    case (`.png`):
      return `image/png`;
    case (`.ico`):
      return `image/x-icon`;
    default:
      return `text/plain`;
  }
};

module.exports = {
  coloring,
  findObjectInArray,
  getRandomInteger,
  generateRandomArray,
  getContentType
};
