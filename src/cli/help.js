const {coloring} = require(`../utils`);
const version = require(`./version`);
const name = require(`./name`);
const author = require(`./author`);
const license = require(`./license`);
const description = require(`./description`);

const commands = [version, name, author, license, description,
  {
    name: `help`,
    command: `--help`,
    description: `Shows program help`,
    execute: () => commands.reduce((prev, next) => `${prev}${coloring(next.command)} - ${coloring(next.description, `green`)}\n`, ``)
  }
];

module.exports = {
  commands
};
