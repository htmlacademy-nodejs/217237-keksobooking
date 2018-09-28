const {coloring} = require(`../utils`);
const version = require(`./version`);
const name = require(`./name`);
const author = require(`./author`);
const license = require(`./license`);
const description = require(`./description`);

const commands = [version, name, author, license, description,
  {
    name: `--help`,
    description: `Shows program help`,
    execute: () => commands.reduce((prev, next) => `${prev}${coloring(next.name)} - ${coloring(next.description, `green`)}\n`, `\n`)
  }
];

module.exports = {
  commands
};
