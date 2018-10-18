const request = require(`supertest`);
const assert = require(`assert`);
const app = require(`../src/static-server`);

describe(`GET /api/offers`, () => {
  it(`should get all offers`, async () => {
    const {body: {total}} = await request(app)
      .get(`/api/offers?skip=0&limit=20`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    assert.strictEqual(total, 10);
  });

  it(`should get all offers with / at the end`, async () => {
    const {body: {total}} = await request(app)
      .get(`/api/offers/?skip=0&limit=20`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    assert.strictEqual(total, 10);
  });

  it(`should get error with invalid params`, async () => {
    return await request(app)
      .get(`/api/offers/?skip=test`)
      .set(`Accept`, `application/json`)
      .expect(400)
      .expect(`Не корректно переданы параметры`)
      .expect(`Content-Type`, /html/);
  });

  it(`should get error from unknown resource`, async () => await request(app)
    .get(`/api/test/request`)
    .set(`Accept`, `application/json`)
    .expect(404)
    .expect(`Not Found`)
    .expect(`Content-Type`, /html/)
  );
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
  it(`should return json for multipart/form-data request`, async () => {
    const address = `100, 200`;
    const [x, y] = address.split(`, `);

    const {body} = await request(app)
      .post(`/api/offers`)
      .field(`address`, address)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `multipart/form-data`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    assert.strictEqual(body.address, address);
    assert.deepEqual(body.location, {x, y});
  });
});
