const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config()

const pool = mysql.createPool({ //connection pool 
	connectionLimit: 10,
	host: process.env.DB_HOST,
	   user: process.env.DB_USER,
	password: process.env.DB_PASSWORD, //find how to do this properly
	database: process.env.DB_NAME
  })

 module.exports = {
	encrypt:(text) => {
		if (text == null) {
			return text;
		}
		var cipher = crypto.createCipher('aes-256-ctr', process.env.ENCRYPTION_KEY)
		var crypted = cipher.update(text, 'utf8', 'hex')
		crypted += cipher.final('hex')
		return crypted
	 },
	 decrypt:(text) => {
		if (text == null) {
			return text;
		}
		var decipher = crypto.createDecipher('aes-256-ctr', process.env.ENCRYPTION_KEY)
		var dec = decipher.update(text, 'hex', 'utf8')
		dec += decipher.final('utf8')
		return dec
	 },
	 database:() =>{
		return pool
	 }

 }


