const {findCommandByName, run} = require(`./app`);

const appName = findCommandByName(`--name`).execute();
const appVersion = findCommandByName(`--version`).execute();
const appHelp = findCommandByName(`--help`).execute();

module.exports = {
  name: `CLI`,
  description: `Command Line Interface of ${appName}`,
  run: (command) => {
    if (!command) {
      console.log(`Добро пожаловать в приложение "${appName}" ${appVersion}\nСписок доступных команд:${appHelp}`);
      run();
    } else if (findCommandByName(command)) {
      console.log(findCommandByName(command).execute());
      process.exit(0);
    } else {
      console.error(`Неизвестная команда ${command}`);
      console.log(`Список доступных команд:\n${appHelp}`);
      process.exit(1);
    }
  }
};
