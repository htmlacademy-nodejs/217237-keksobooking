const assert = require(`assert`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const generate = require(`../src/cli/generate`);
const generateEntity = require(`../src/generator`);
const Offer = require(`../src/models/offer`);
const messages = require(`../src/mock/messages`);

const access = promisify(fs.access);
const unlink = promisify(fs.unlink);

describe(`Entity generator`, () => {
  it(`should fail on non existing folder`, async () => {
    const tmpFile = `${__dirname}/folder/test.json`;

    try {
      await generate.execute(tmpFile);

      return assert.fail(`Path ${tmpFile} should not be available`);
    } catch (e) {
      return assert.ok(e.message);
    }
  });

  it(`should create new file`, async () => {
    const tmpFile = `${__dirname}/test.json`;

    try {
      await generate.execute(tmpFile);
      await access(tmpFile);
      await unlink(tmpFile);

      return assert.ok(`Ok`);
    } catch (e) {
      return assert.fail(e.message);
    }
  });

  it(`should create file with right data`, async () => {
    const tmpFile = `${__dirname}/test.json`;
    const data = {test: `test data`};

    try {
      await generate.execute(tmpFile, data);
      const file = require(tmpFile);

      assert.deepStrictEqual(data, file);
      await access(tmpFile);
      await unlink(tmpFile);

      return assert.ok(`Ok`);
    } catch (e) {
      return assert.fail(e.message);
    }
  });
});

describe(`Entity data`, () => {
  const [data] = generateEntity();
  const {author, offer, location, date} = data;
  const testEntity = {
    author: {avatar: null},
    offer: {
      title: null,
      address: null,
      price: null,
      type: null,
      rooms: null,
      guests: null,
      checkin: null,
      checkout: null,
      features: null,
      description: null,
      photos: null
    },
    location: {x: null, y: null},
    date: null
  };

  it(`should guests correct`, () => assert.ok(typeof author.avatar === `string`));

  it(`should title correct`, () => assert.ok(messages.titles.includes(offer.title)));

  it(`should address correct`, () => assert.strictEqual(offer.address, `${location.x} ${location.y}`));

  it(`should price correct`, () => assert.ok(offer.price >= 1000 && offer.price <= 1000000));

  it(`should type correct`, () => assert.ok(messages.type.find((item) => item === offer.type)));

  it(`should rooms correct`, () => assert.ok(offer.rooms >= 1 && offer.rooms <= 5));

  it(`should guests correct`, () => assert.ok(typeof offer.guests === `number` && offer.guests >= 1));

  it(`should checkin correct`, () => assert.ok(messages.time.includes(offer.checkin)));

  it(`should checkout correct`, () => assert.ok(messages.time.includes(offer.checkout)));

  it(`should features correct`, () => {
    assert.ok(offer.features.length <= messages.features.length);
    assert.deepStrictEqual([...new Set(offer.features)], offer.features);
  });

  it(`should description correct`, () => assert.strictEqual(``, offer.description));

  it(`should photos correct`, () => assert.strictEqual(messages.photos.length, offer.photos.length));

  it(`should location correct`, () => {
    assert.ok(location.x >= 300 && location.x <= 900);
    assert.ok(location.y >= 150 && location.y <= 500);
  });

  it(`should date correct`, () => assert.ok(Date.now() >= date));

  it(`should model correct`, () => assert.notDeepStrictEqual(testEntity, new Offer(data).entity));
});
