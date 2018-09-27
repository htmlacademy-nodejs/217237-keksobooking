const colors = require(`colors`);
const {version, name, author} = require('./package.json');

const coloring = (string, color = 'grey') => colors[color](string);
const coloredVersion = `${coloring(version.split('.')[0], 'red')}.${coloring(version.split('.')[1], 'green')}.${coloring(version.split('.')[2], 'blue')}`;
const getMessage = command => {
  const messages = {
    '--version': coloredVersion,
    '--help': `
      Доступные команды:
      ${coloring('--help')}    — ${coloring('печатает этот текст', 'green')};
      ${coloring('--version')} — ${coloring('печатает версию приложения', 'green')};
    `
  };

  if (!command) return {
    message: `
      Привет пользователь!
      Эта программа будет запускать сервер ${name}.
      Автор: ${author}
    `,
    code: 0
  };

  if (!messages.hasOwnProperty(command)) return {
    message: `
      Неизвестная команда ${command}.
      Чтобы прочитать правила использования приложения, наберите "--help"
    `,
    code: 1
  };

  return {message: messages[command], code: 0};
};

const result = getMessage(process.argv[2]);

if (result.code === 0) {
  console.log(result.message);
} else {
  console.error(result.message);
}

process.exit(result.code);
