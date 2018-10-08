const readline = require(`readline`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const {generateEntity} = require(`../generator`);
const generate = require(`./generate`);

const createInterface = () => readline.createInterface(process.stdin, process.stdout);
const setPrompt = (rl, prompt) => {
  rl.setPrompt(`${prompt}\n`);

  rl.prompt();
};
const access = promisify(fs.access);
let data = [];
let path = ``;

const rewriteFile = () => {
  const rl = createInterface();

  setPrompt(rl, `Файл уже существует, перезаписать?(y/n)`);

  rl.on(`line`, async (line) => {
    switch (line.trim().toLowerCase()) {
      case (`y`): {
        await generate.execute(path, data);
        rl.close();
        break;
      }
      case (`n`): {
        setPrompt(rl, `Спасибо за ответ, до свидания!`);
        break;
      }
      default: {
        console.log(`Неизвестная команда: ${line.trim()}`);
        break;
      }
    }
  }).on(`close`, () => {
    setPrompt(rl, `Файл успешно перезаписан!`);
    process.exit(0);
  });
};

const saveData = () => {
  const rl = createInterface();

  setPrompt(rl, `Укажите путь к файлу:`);

  rl.on(`line`, async (line) => {
    try {
      await access(line);
      path = line;
      rl.close();
    } catch (e) {
      if (e.code === `ENOENT`) {
        await generate.execute(line, data);
        setPrompt(rl, `Файл успешно сохранен!`);
        process.exit(0);
      } else {
        setPrompt(rl, `Не корректный путь`);
      }
    }
  }).on(`close`, () => {
    rewriteFile();
  });
};

const generateEntities = () => {
  const rl = createInterface();

  setPrompt(rl, `Укажите количество сущностей:`);

  rl.on(`line`, (line) => {
    if (Number.parseInt(line, 10) && Number.parseInt(line, 10) > 0) {
      data = generateEntity(line);
      rl.close();
    } else {
      setPrompt(rl, `Значение не корректное, попробуйде снова!`);
    }
  }).on(`close`, () => {
    setPrompt(rl, `Сгенерированные данные:\n${JSON.stringify(data)}`);
    saveData();
  });
};

const run = () => {
  const rl = createInterface();

  setPrompt(rl, `Давайте сгенерируем тестовые данные?(y/n)`);

  rl.on(`line`, (line) => {
    switch (line.trim().toLowerCase()) {
      case (`y`): {
        rl.close();
        break;
      }
      case (`n`): {
        setPrompt(rl, `Спасибо за ответ, до свидания!`);
        process.exit(0);
        break;
      }
      default: {
        console.log(`Неизвестная команда: ${line.trim()}`);
        break;
      }
    }
  }).on(`close`, () => {
    generateEntities();
  });
};

module.exports = run;
