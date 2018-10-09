const runGenerator = require(`./app`);
const commands = require(`./help`);
const {findObjectInArray} = require(`../utils`);

const findCommandByName = (command) => findObjectInArray(commands, `name`, command);
const APP_NAME = findCommandByName(`--name`).execute();
const APP_VERSION = findCommandByName(`--version`).execute();
const APP_HELP = findCommandByName(`--help`).execute();
const startServer = (port) => findCommandByName(`--server`).execute(port);

module.exports = {
  name: `CLI`,
  description: `Command Line Interface of ${APP_NAME}`,
  run: async (command) => {
    if (!command) {
      console.log(`Добро пожаловать в приложение "${APP_NAME}" ${APP_VERSION}`);
      runGenerator();
    } else if (findCommandByName(command)) {
      if (command === `--server`) {
        startServer();
      } else {
        console.log(await findCommandByName(command).execute());
        process.exit(0);
      }
    } else {
      console.error(`Неизвестная команда ${command}`);
      console.log(`Список доступных команд:\n${APP_HELP}`);
      process.exit(1);
    }
  }
};
