const {findObjectInArray} = require(`../utils`);
const {commands} = require(`./help`);

const input = process.openStdin();
const findCommandByName = (command) => findObjectInArray(commands, `name`, command);

input.addListener(`data`, async (d) => {
  const userCommand = d.toString().trim();
  const command = findCommandByName(userCommand);

  if (userCommand && command) {
    console.log(await command.execute());
  } else if (userCommand && !command) {
    console.error(`Неизвестная команда ${userCommand}\nСписок доступных:${findCommandByName(`--help`).execute()}`);
  }
});

module.exports = {
  findCommandByName,
  run: () => input
};
