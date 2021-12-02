const jwt = require('jsonwebtoken');
const { database } = require('../database')

module.exports = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null){
      return res.status(403).json({ message: 'Invalid token' });
    }

    database().query("SELECT * FROM blacklisted_jwts WHERE token = ?", [token], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }
        else{
            if(rows.length > 0){
                return res.status(403).json({ message: 'Invalid token' });
            }

            jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
                if (error) return res.status(403).json({ message: 'Invalid token' });
                req.user = user;
                req.token = token;
                next();
            });

        }
    })
  },
};