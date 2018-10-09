const server = require(`../static-server`);

const HOSTNAME = `127.0.0.1`;
const PORT = process.argv[3] || 3000;

module.exports = {
  name: `--server`,
  description: `Start static server {PORT}`,
  execute() {
    server.listen(PORT, HOSTNAME, (err) => {
      if (err) {
        console.error(`An error occurred while starting the server`);
      }

      console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
    });
  }
};
