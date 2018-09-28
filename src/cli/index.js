const {coloring} = require(`../utils`);
const version = require(`./version-module`);
const name = require(`./name-module`);
const author = require(`./author-module`);
const license = require(`./license-module`);
const description = require(`./description-module`);

const appCommands = {version, name, author, license, description};

module.exports = {
  name: `CLI`,
  description: `Command Line Interface of ${coloring(name.name, `green`)}`,
  run(command) {
    if (command && appCommands.hasOwnProperty(command)) {
      console.log(appCommands[command].execute());
    } else if (!command) {
      console.log(`Что писать при отсутствии аргументов, в ТЗ указано не было, по этому здесь эта строка.`);
    } else {
      console.error(`Неизвестная команда ${command}`);
      console.log(`
    Список доступных команд:
    ${coloring(version.name)}     - ${coloring(version.description, `green`)}
    ${coloring(name.name)}        - ${coloring(name.description, `green`)}
    ${coloring(author.name)}      - ${coloring(author.description, `green`)}
    ${coloring(license.name)}     - ${coloring(license.description, `green`)}
    ${coloring(description.name)} - ${coloring(description.description, `green`)}
  `);
      process.exit(1);
    }
  }
};
