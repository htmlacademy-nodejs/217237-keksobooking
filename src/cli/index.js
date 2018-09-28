const {coloring, findObjectInArray} = require(`../utils`);
const {commands: appCommands} = require(`./help`);

const findCommandByCommand = (command) => findObjectInArray(appCommands, `command`, command);
const findCommandByName = (command) => findObjectInArray(appCommands, `name`, command);

module.exports = {
  name: `CLI`,
  description: `Command Line Interface of ${coloring(findObjectInArray(appCommands, `name`, `name`).execute(), `green`)}`,
  run: (command) => {
    if (!command) {
      console.log(`Что писать при отсутствии аргументов, в ТЗ указано не было, по этому здесь эта строка.`);
    } else if (findCommandByCommand(command)) {
      console.log(findCommandByCommand(command).execute());
    } else if (findCommandByName(command)) {
      console.log(findCommandByName(command).execute());
    } else {
      console.error(`Неизвестная команда ${command}`);
      console.log(`Список доступных команд:\n${findObjectInArray(appCommands, `name`, `help`).execute()}`);
      process.exit(1);
    }
  }
};
