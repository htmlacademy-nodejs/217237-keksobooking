const request = require(`supertest`);
const assert = require(`assert`);
const app = require(`../src/static-server`);
const {names} = require(`../src/mock/messages`);

describe(`GET /api/offers`, () => {
  it(`should get all offers from default props`, async () => {
    const {body: {total, skip, limit, data}} = await request(app)
      .get(`/api/offers`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    assert.strictEqual(total, 10);
    assert.strictEqual(skip, 0);
    assert.strictEqual(limit, 20);
    assert.strictEqual(data.length, total);
  });

  it(`should get all offers with / at the end`, async () => {
    const {body: {total}} = await request(app)
      .get(`/api/offers/?skip=0&limit=20`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    assert.strictEqual(total, 10);
  });

  it(`should get error from unknown resource`, async () => await request(app)
    .get(`/api/test/request`)
    .set(`Accept`, `application/json`)
    .expect(404)
    .expect(`Not Found`)
    .expect(`Content-Type`, /html/)
  );

  it(`should get error with invalid params`, async () => {
    return await request(app)
      .get(`/api/offers/?skip=test`)
      .set(`Accept`, `application/json`)
      .expect(400)
      .expect(`Не корректно переданы параметры`)
      .expect(`Content-Type`, /html/);
  });
});

describe(`GET /api/offers/:date`, () => {
  it(`should get error with not number date`, async () => await request(app)
    .get(`/api/offers/date`)
    .set(`Accept`, `application/json`)
    .expect(400)
    .expect(`Не корректно переданы параметры`)
    .expect(`Content-Type`, /html/)
  );
});

describe(`POST /api/offers`, () => {
  it(`should return correct answer`, async () => {
    const testData = {
      title: `Маленькая квартирка рядом с парком`,
      address: `570, 472`,
      description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
      price: 30000,
      type: `flat`,
      rooms: 1,
      guests: 1,
      checkin: `9:00`,
      checkout: `7:00`,
      features: [`elevator`, `conditioner`]
    };
    const [x, y] = testData.address.split(`, `);

    const {body} = await request(app)
      .post(`/api/offers`)
      .send(testData)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    assert.ok(names.find((name) => name === body.name));
    assert.strictEqual(body.address, testData.address);
    assert.deepStrictEqual(body.location, {x, y});
  });
});
