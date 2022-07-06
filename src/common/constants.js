// Shared constants.

exports.DEFAULT_LIMIT = 2;

// ENVs - correct values to set in .env and use.
const ENVIRONMENTS = {
  DEV: 'dev',
  STAGING: 'staging',
  PRODUCTION: 'production',
  TEST: 'test',
};
exports.ENVIRONMENTS = ENVIRONMENTS;

exports.YYYY_MM_DD_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// HTTP Statuses.
exports.OK = 200;
exports.CREATED = 201;
exports.NOCONTENT = 204;
exports.BAD_REQUEST = 400;
exports.INVALID_PARAMETERS = 422;
exports.FORBIDDEN = 403;
exports.METHOD_NOT_ALLOWED = 405;
exports.NOT_ACCEPTABLE = 406;
exports.TOO_MANY_REQUESTS = 429;
exports.NOT_FOUND = 404;
exports.CONFLICT = 409;
exports.SERVER_ERROR = 500;
exports.SERVER_TIMEOUT = 504;
exports.UNAUTHORIZED = 401;

exports.SUCCESS = 'SUCCESS';
exports.FAILED = 'FAILED';
