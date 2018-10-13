class IllegalArgumentError extends Error {
  constructor(props) {
    super(props);
    this.code = 400;
  }
}

class NotFoundError extends Error {
  constructor(props) {
    super(props);
    this.code = 404;
  }
}

module.exports = {
  IllegalArgumentError,
  NotFoundError
};
