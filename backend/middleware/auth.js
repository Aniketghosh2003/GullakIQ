const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization token provided, access denied' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

  if (!token) {
    return res.status(401).json({ error: 'Invalid token format, access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'paisa_super_secret_jwt_key_2026_production');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is invalid or has expired' });
  }
};
