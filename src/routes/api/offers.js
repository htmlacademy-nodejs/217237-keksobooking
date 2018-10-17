// eslint-disable-next-line new-cap
const router = require(`express`).Router();
const generator = require(`../../generator`);
const {IllegalArgumentError, NotFoundError} = require(`../../errors`);

const SKIP_DEFAULT = 0;
const LIMIT_DEFAULT = 20;
const offers = generator(10);

router.get(``, (req, res) => {
  const {skip, limit} = req.query;

  res.send({
    skip: Number(skip) || SKIP_DEFAULT,
    limit: Number(limit) || LIMIT_DEFAULT,
    total: offers.length,
    data: offers
  });
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

module.exports = router;
