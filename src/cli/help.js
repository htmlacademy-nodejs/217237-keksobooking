const {coloring} = require(`../utils`);
const version = require(`./version`);
const name = require(`./name`);
const author = require(`./author`);
const license = require(`./license`);
const description = require(`./description`);
const generate = require(`./generate`);

const commands = [{
  name: `--help`,
  description: `Shows program help`,
  execute: () => commands.reduce((string, command) => `${string}${coloring(command.name)} - ${coloring(command.description, `green`)}\n`, `\n`)
}, version, name, author, license, description, generate];

module.exports = commands;
