const readline = require(`readline`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const generateEntity = require(`../generator`);
const generate = require(`./generate`);

const access = promisify(fs.access);

const rl = readline.createInterface(process.stdin, process.stdout);
let data;
let path;

const run = () => rl.question(`Давайте сгенерируем тестовые данные?(y/n) `, (answer) => {
  switch (answer.trim().toLowerCase()) {
    case (`y`): {
      return getData();
    }
    case (`n`): {
      console.log(`Спасибо за ответ, до свидания!`);
      process.exit(0);
      return answer;
    }
    default: {
      console.log(`Неизвестная команда: ${answer.trim()}`);
      return run();
    }
  }
});

const getData = () => rl.question(`Укажите количество сущностей: `, (answer) => {
  if (Number.parseInt(answer, 10) && Number.parseInt(answer, 10) > 0) {
    data = generateEntity(answer);
    return getPath();
  } else {
    console.log(`Значение не корректное, попробуйде снова!`);
    return getData();
  }
});

const getPath = () => rl.question(`Укажите путь к файлу: `, async (answer) => {
  try {
    await access(answer);
    path = answer;
    return rewriteFile();
  } catch (e) {
    if (e.code === `ENOENT`) {
      path = answer;
      return writeFile();
    } else {
      console.log(`Значение не корректное, попробуйде снова!`);
      return getPath();
    }
  }
});

const rewriteFile = () => rl.question(`Файл уже существует, перезаписать?(y/n) `, (answer) => {
  switch (answer.trim().toLowerCase()) {
    case (`y`): {
      return writeFile();
    }
    case (`n`): {
      return getPath();
    }
    default: {
      console.log(`Неизвестная команда: ${answer.trim()}`);
      return rewriteFile();
    }
  }
});

const writeFile = async () => {
  await generate.execute(path, data);
  console.log(`Файл успешно сохранен!`);
  process.exit(0);
};

module.exports = run;
