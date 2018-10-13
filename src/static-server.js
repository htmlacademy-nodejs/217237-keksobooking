const express = require(`express`);

const offers = require(`./routes/api/offers`);

const app = express();

app.use(express.static(`${process.cwd()}/static`));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(`/api/offers`, offers);

app.use((req, res) => res.status(404).send(`Not Found`));
app.use((err, req, res, _next) => {
  if (err) {
    console.error(err);
    res.status(err.code || 500).send(err.message);
  }
});

module.exports = app;
