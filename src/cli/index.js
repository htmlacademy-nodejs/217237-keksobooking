const {findCommandByName, run} = require(`./app`);

const APP_NAME = findCommandByName(`--name`).execute();
const APP_VERSION = findCommandByName(`--version`).execute();
const APP_HELP = findCommandByName(`--help`).execute();

module.exports = {
  name: `CLI`,
  description: `Command Line Interface of ${APP_NAME}`,
  run: (command) => {
    if (!command) {
      console.log(`Добро пожаловать в приложение "${APP_NAME}" ${APP_VERSION}\nСписок доступных команд:${APP_HELP}`);
      run();
    } else if (findCommandByName(command)) {
      console.log(findCommandByName(command).execute());
      process.exit(0);
    } else {
      console.error(`Неизвестная команда ${command}`);
      console.log(`Список доступных команд:\n${APP_HELP}`);
      process.exit(1);
    }
  }
};
