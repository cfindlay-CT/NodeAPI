module.exports = function (req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  const keys = process.env.API_KEYS ? process.env.API_KEYS.split(',') : [];
  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required' });
  }

  if (!keys.includes(apiKey)) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  next();
}