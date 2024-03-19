const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token)
    return res.status(403).json({ message: 'Token is not authorized' });

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) return res.status(401).json({ message: 'Unauthorized' });
    req.user = { ...decoded, isAuthenticated: true };
    next();
  });
};

module.exports = isAuthenticated;
