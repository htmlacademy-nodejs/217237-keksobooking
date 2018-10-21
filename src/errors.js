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

class ValidationError extends Error {
  constructor(errors) {
    super(`Data validation error`);
    this.errors = errors;
    this.code = 400;
  }
}

module.exports = {
  IllegalArgumentError,
  NotFoundError,
  ValidationError
};
