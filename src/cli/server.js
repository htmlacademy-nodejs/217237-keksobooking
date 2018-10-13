const app = require(`../static-server`);

const PORT = Number.parseInt(process.argv[3], 10) || 3000;

module.exports = {
  name: `--server`,
  description: `Start static server [PORT]`,
  execute: () => {
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));

    return ``;
  }
};
