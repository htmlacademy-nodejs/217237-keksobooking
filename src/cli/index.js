const version = require(`./version-module`);
const name = require(`./name-module`);
const author = require(`./author-module`);
const license = require(`./license-module`);
const description = require(`./description-module`);

const appCommands = {version, name, author, license, description};

module.exports = {
  name: 'CLI',
  description: `Command Line Interface of ${name.name}`,
  run(command) {
    if (command && appCommands.hasOwnProperty(command)) {
      console.log(appCommands[command].execute());
    } else if (!command) {
      console.log(`Что писать при отсутствии аргументов, в ТЗ указано не было, по этому здесь эта строка.`)
    } else {
      console.error(`Неизвестная команда ${command}`);
      console.log(`
    Список доступных команд:
    ${version.name} - ${version.description}
    ${name.name} - ${name.description}
    ${author.name} - ${author.description}
    ${license.name} - ${license.description}
    ${description.name} - ${description.description}
  `);
      process.exit(1);
    }
  }
};
