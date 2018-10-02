const fs = require(`fs`);
const {promisify} = require(`util`);
const {getRandomInteger, coloring} = require(`../utils`);
const {generateEntity} = require(`../generator`);
const write = promisify(fs.writeFile);

const DEFAULT_PATH = `${process.cwd()}/src/mock/ads.mock.json`;
const RANDOM_DATA = generateEntity(getRandomInteger(1, 10));
const DEFAULT_OPTIONS = {encoding: `utf-8`, mode: 0o644};

module.exports = {
  name: `--generate`,
  description: `Generate test data`,
  execute: async (path = DEFAULT_PATH, data = RANDOM_DATA, options = DEFAULT_OPTIONS) => {
    await write(path, JSON.stringify(data), options);

    return `${coloring(`${data.length} entity созданы и записаны в этот файл:`, `green`)} ${coloring(path, `yellow`)}`;
  }
};
