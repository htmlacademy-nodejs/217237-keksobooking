const assert = require(`assert`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const generate = require(`../src/cli/generate`);

const access = promisify(fs.access);
const unlink = promisify(fs.unlink);

describe(`Entity generator`, () => {
  it(`should fail on non existing folder`, async () => {
    const tmpFile = `${__dirname}/folder/testfile.json`;

    try {
      await generate.execute(tmpFile);

      return assert.fail(`Path ${tmpFile} should not be available`);
    } catch (e) {
      return assert.ok(e.message);
    }
  });

  it(`should create new file`, async () => {
    const tmpFile = `${__dirname}/testfile.json`;

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
    const tmpFile = `${__dirname}/testfile.json`;
    const data = {test: `test data`};

    try {
      await generate.execute(tmpFile, data);
      const file = require(tmpFile);

      assert.deepEqual(data, file);
      await access(tmpFile);
      await unlink(tmpFile);

      return assert.ok(`Ok`);
    } catch (e) {
      return assert.fail(e.message);
    }
  });
});
