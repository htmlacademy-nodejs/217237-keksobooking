const request = require(`supertest`);
const assert = require(`assert`);
const app = require(`../src/static-server`);

describe(`GET /api/offers`, () => {
  it(`should get all offers`, async () => {
    const {body: {total}} = await request(app)
      .get(`/api/offers`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    assert.equal(total, 10);
  });

  it(`should get all offers with / at the end`, async () => {

    const {body: {total}} = await request(app)
      .get(`/api/offers/`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    assert.equal(total, 10);
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
