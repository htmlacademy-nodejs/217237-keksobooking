// eslint-disable-next-line new-cap
const router = require(`express`).Router();
const generator = require(`../../generator`);
const {IllegalArgumentError, NotFoundError} = require(`../../errors`);
const validate = require(`../validation`);

const SKIP_DEFAULT = 0;
const LIMIT_DEFAULT = 20;
const offers = generator(10);

router.get(``, (req, res) => {
  const skip = Number(req.query.skip) || SKIP_DEFAULT;
  const limit = Number(req.query.limit) || LIMIT_DEFAULT;

  const data = offers.slice(skip).slice(0, limit);

  res.send({skip, limit, total: data.length, data});
});

router.get(`/:date`, (req, res) => {
  const {date} = req.params;

  if (!date || !Number.parseInt(date, 10)) {
    throw new IllegalArgumentError(`Не корректно переданы параметры`);
  }

  const target = offers.find((offer) => Number(offer.date) === Number(date));

  if (!target) {
    throw new NotFoundError(`Объявление не найдено`);
  }

  res.send(target);
});

router.post(``, (req, res) => {
  res.send(validate(req.body));
});

module.exports = router;
