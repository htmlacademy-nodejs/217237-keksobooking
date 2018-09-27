const {version, name, author} = require(`./package.json`);

const getMessage = (command) => {
  const messages = {
    '--version': version,
    '--help': `Доступные команды:\n--help — печатает этот текст;\n--version — печатает версию приложения;`
  };

  if (!command) {
    return {
      message: `Привет пользователь!\nЭта программа будет запускать сервер ${name}.\nАвтор: ${author}`,
      code: 0
    };
  }

  if (!messages.hasOwnProperty(command)) {
    return {
      message: `Неизвестная команда ${command}.\nЧтобы прочитать правила использования приложения, наберите "--help"`,
      code: 1
    };
  }

  return {message: messages[command], code: 0};
};

const result = getMessage(process.argv[2]);

if (result.code === 0) {
  console.log(result.message);
} else {
  console.error(result.message);
}

process.exit(result.code);
