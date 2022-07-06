const {
  OK,
  NOT_FOUND,
  DEFAULT_LIMIT,
} = require('../common/constants');

const { getBestProfession, getBestClientsList } = require('../repositories/adminRepository');

// GET `/admin/best-profession?start=<date>&end=<date>`
// Returns the profession that earned the most money (sum of jobs paid)
// for any contactor that worked in the query time range.
exports.getAdminBestProfessionController = async (req, res) => {
  const { start, end } = req.query;
  const bestProfession = await getBestProfession(start, end);

  if (!bestProfession) {
    return res.status(NOT_FOUND).json({ error: 'No results found.' });
  }

  const { profession, earned } = bestProfession;

  return res.status(OK).json({ profession, earned });
};

// GET `/admin/best-clients?start=<date>&end=<date>&limit=<integer>`
// Returns the clients the paid the most for jobs in the query time period.
// limit query parameter should be applied, default limit is 2.
exports.getAdminBestClientsController = async (req, res) => {
  const { start, end, limit } = req.query;
  const size = (limit && parseInt(limit, 10)) > 0 ? limit : DEFAULT_LIMIT;

  const bestClients = await getBestClientsList(start, end, size);

  if (!bestClients || bestClients.length === 0) {
    return res.status(NOT_FOUND).json({ error: 'No results found.' });
  }
  return res.status(OK).json(bestClients);
};
