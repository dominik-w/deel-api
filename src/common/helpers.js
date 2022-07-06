// Shared helpers.

// const getEnv = () => process.env.ENV;

const base64Encode = (dataToEncode) => Buffer.from(dataToEncode).toString('base64');

// eslint-disable-next-line max-len
const getDueDate = (invoiceDate, duration) => new Date(invoiceDate.setDate(invoiceDate.getDate() + duration));

const getAbsoluteTimeStringForStartDate = (date) => `${date}T00:00:00.000Z`;
const getAbsoluteTimeStringForEndDate = (date) => `${date}T23:59:59.999Z`;

const getAbsoluteTimeStringForDate = (date) => {
  const start = getAbsoluteTimeStringForStartDate(date);
  const end = getAbsoluteTimeStringForEndDate(date);
  return [start, end];
};

module.exports = {
  base64Encode,
  getDueDate,
  getAbsoluteTimeStringForStartDate,
  getAbsoluteTimeStringForEndDate,
  getAbsoluteTimeStringForDate,
};
