const jwt = require('jsonwebtoken');
const { blacklistedTokenExists } = require('../database/users');

module.exports = {
  authenticateToken: async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    const tokenExists = await blacklistedTokenExists(token);
    if (tokenExists) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
      if (error) return res.status(403).json({ message: 'Invalid token' });

      req.user = user;
      req.token = token;

      next();
    });
  },
};
