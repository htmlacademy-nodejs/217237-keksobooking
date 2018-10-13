// eslint-disable-next-line new-cap
const router = require(`express`).Router();
const generator = require(`../../generator`);
const {IllegalArgumentError, NotFoundError} = require(`../../errors`);

const offers = generator(10);

router.get(``, (req, res) => {
  res.send(offers);
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
