const crypto = require('crypto');

module.exports = {
  encrypt: (text) => {
    if (text == null) {
      return text;
    }

    const algorithm = 'aes-256-ctr';
    const encryptionKey = process.env.ENCRYPTION_KEY;
    // TODO: store initialization vector in DB (create a column for each table
    // that uses encryption)
    // const initVector = crypto.randomBytes(16);
    // Note: currently stored initVector.toString('hex') in .env file
    const initVector = Buffer.from(process.env.INIT_VECTOR, 'hex');

    const cipher = crypto.createCipheriv(algorithm, encryptionKey, initVector);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  },
  decrypt: (text) => {
    if (text == null) {
      return text;
    }

    const algorithm = 'aes-256-ctr';
    const encryptionKey = process.env.ENCRYPTION_KEY;
    const initVector = Buffer.from(process.env.INIT_VECTOR, 'hex');

    const decipher = crypto.createDecipheriv(
      algorithm,
      encryptionKey,
      initVector
    );

    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  },
};
