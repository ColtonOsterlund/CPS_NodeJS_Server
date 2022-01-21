const escape = require('sql-template-strings');
const db = require('./connection');

module.exports = {
  readUserByEmail: async (email) => {
    const results = await db.query(escape`
      SELECT
        BIN_TO_UUID(id) AS id,
        email,
        password,
        CAST(AES_DECRYPT(first_name, '${process.env.ENCRYPTION_KEY}') AS firstName,
        CAST(AES_DECRYPT(last_name, '${process.env.ENCRYPTION_KEY}') AS lastName,
        CAST(AES_DECRYPT(main_address, '${process.env.ENCRYPTION_KEY}') AS mainAddress,
        CAST(AES_DECRYPT(secondary_address, '${process.env.ENCRYPTION_KEY}') AS secondaryAddress,
        CAST(AES_DECRYPT(city, '${process.env.ENCRYPTION_KEY}') AS city,
        CAST(AES_DECRYPT(province, '${process.env.ENCRYPTION_KEY}') AS province,
        CAST(AES_DECRYPT(country, '${process.env.ENCRYPTION_KEY}') AS country,
        CAST(AES_DECRYPT(zip_code, '${process.env.ENCRYPTION_KEY}') AS zipCode,
        CAST(AES_DECRYPT(phone, '${process.env.ENCRYPTION_KEY}') AS phone
      FROM users
      WHERE email = ${email}
    `);

    return { ...(results[0] ?? {}) };
  },
  createUser: async (user) => {
    const {
      email,
      hash,
      firstName,
      lastName,
      mainAddress,
      secondaryAddress,
      city,
      province,
      country,
      zipCode,
      phone,
    } = user;

    const result = await db.query(escape`
      INSERT
      INTO users (
        email,
        password,
        first_name,
        last_name,
        main_address,
        secondary_address,
        city,
        province,
        country,
        zip_code,
        phone
      )
      VALUES (
        ${email},
        ${hash},
        AES_ENCRYPT(${firstName}, '${process.env.ENCRYPTION_KEY}'),
        AES_ENCRYPT(${lastName}, '${process.env.ENCRYPTION_KEY}'),
        AES_ENCRYPT(${mainAddress}, '${process.env.ENCRYPTION_KEY}'),
        AES_ENCRYPT(${secondaryAddress}, '${process.env.ENCRYPTION_KEY}'),
        AES_ENCRYPT(${city}, '${process.env.ENCRYPTION_KEY}'),
        AES_ENCRYPT(${province}, '${process.env.ENCRYPTION_KEY}'),
        AES_ENCRYPT(${country}, '${process.env.ENCRYPTION_KEY}'),
        AES_ENCRYPT(${zipCode}, '${process.env.ENCRYPTION_KEY}'),
        AES_ENCRYPT(${phone}, '${process.env.ENCRYPTION_KEY}')
      )
    `);

    return result;
  },
  userExistsByEmail: async (email) => {
    const result = await db.query(escape`
      SELECT email
      FROM users
      WHERE email = ${email}
    `);

    return result.length > 0;
  },
  blacklistToken: async (token, expiration) => {
    const result = await db.query(escape`
      INSERT
      INTO blacklisted_jwts (token, expiration)
      VALUES (${token}, ${expiration})
    `);

    return result;
  },
  blacklistedTokenExists: async (token) => {
    const result = await db.query(escape`
      SELECT token
      FROM blacklisted_jwts
      WHERE token = ${token}
    `);

    return result.length > 0;
  },
};
