const http = require(`http`);
const fs = require(`fs`);
const {extname} = require(`path`);
const mime = require(`mime-types`);
const {promisify} = require(`util`);

const readfile = promisify(fs.readFile);

const readFile = async (path, res) => {
  const data = await readfile(path);
  const ext = extname(path);

  res.setHeader(`content-type`, mime.lookup(ext));
  res.end(data);
};

const server = http.createServer((req, res) => {
  const absolutePath = `${process.cwd()}/static${req.url === `/` ? `/index.html` : req.url}`;

  (async () => {
    try {
      await readFile(absolutePath, res);

      req.statusCode = 200;
      req.statusMessage = `OK`;
    } catch (e) {
      res.writeHead(404, `Not Found`);
      res.end();
    }
  })().catch((e) => {
    res.writeHead(500, e.message, {'content-type': `text-plain`});
    res.end(e.message);
  });
});

module.exports = server;
