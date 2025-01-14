const { sendResponse } = require('../utils');

function validateApiKey(req, res, next) {
  const apiKey = req.header('x-api-key');
  const validApiKey = process.env.API_KEY;

  if (!apiKey || apiKey !== validApiKey) {
    return sendResponse(res, 403, null, 'Forbidden: Invalid API Key');
  }

  next();
}

module.exports = validateApiKey;
