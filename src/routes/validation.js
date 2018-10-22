const {ValidationError} = require(`../errors`);
const messages = require(`../../src/mock/messages`);
const {getRandomInteger} = require(`../utils`);

const validate = (data) => {
  const errors = [];

  if (!data.name) {
    data.name = messages.names[getRandomInteger(0, messages.names.length - 1)];
  }
  if (!data.title) {
    errors.push(`Field "title" is required!`);
  }
  if (data.title.length < 30 || data.title.length > 140) {
    errors.push(`Field "title" must be in range 30...140`);
  }
  if (!data.type) {
    errors.push(`Field "type" is required!`);
  }
  if (!messages.type.find((type) => type === data.type)) {
    errors.push(`Field "type" must be one of ${messages.type}`);
  }
  if (!data.price) {
    errors.push(`Field "price" is required!`);
  }
  if (data.price < 1 || data.price > 100000) {
    errors.push(`Field "price" must be in range 30...140`);
  }
  if (!data.address && !data.address.length) {
    errors.push(`Field "address" is required!`);
  }
  if (data.address.length > 100) {
    errors.push(`Field "address" must be less then 100`);
  } else {
    const [x, y] = data.address.split(`, `);
    data.location = {x, y};
  }
  if (!data.checkin) {
    errors.push(`Field "checkin" is required!`);
  }
  if (!data.checkout) {
    errors.push(`Field "checkout" is required!`);
  }
  if (!data.rooms) {
    errors.push(`Field "rooms" is required!`);
  }
  if (data.rooms < 0 || data.rooms > 1000) {
    errors.push(`Field "rooms" must be in range 0...1000`);
  }
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  return data;
};

module.exports = validate;
