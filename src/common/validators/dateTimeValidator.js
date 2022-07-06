// Date/time validators.

const {
  YYYY_MM_DD_REGEX,
} = require('../constants');

exports.validateYearMonthDay = (date) => !((date) && (!YYYY_MM_DD_REGEX.test(date)));
