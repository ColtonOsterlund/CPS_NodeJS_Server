const mysql = require('mysql-await');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = {
  query: async (query) => {
    try {
      const result = await pool.awaitQuery(query);
      return result;
    } catch (error) {
      console.error(error);
    }
  },
  client: pool,
};
