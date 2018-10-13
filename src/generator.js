const Offer = require(`./models/offer`);
const {getRandomInteger, generateRandomArray} = require(`../src/utils`);
const {type, time, features, titles, photos} = require(`./mock/messages`);

const getParams = () => ({
  avatar: `https://robohash.org/${getRandomInteger(0, 100)}`,
  title: titles[getRandomInteger(0, titles.length - 1)],
  x: getRandomInteger(300, 900),
  y: getRandomInteger(150, 500),
  price: getRandomInteger(1000, 1000000),
  type: type[getRandomInteger(0, type.length - 1)],
  rooms: getRandomInteger(1, 5),
  guests: getRandomInteger(1, 12),
  checkin: time[getRandomInteger(0, time.length - 1)],
  checkout: time[getRandomInteger(0, time.length - 1)],
  features: generateRandomArray(features),
  description: ``,
  photos: photos.sort(() => getRandomInteger(-1, 1)),
  date: Date.now() - getRandomInteger(0, 604800000)
});

module.exports = (length = 1) => {
  const arr = [];

  for (let i = 0; i < length; i++) {
    arr.push(new Offer(getParams()).entity);
  }

  return arr;
};
