
 const pool = mysql.createPool({ //connection pool 
	 connectionLimit: 10,
	 host: 'us-cdbr-iron-east-02.cleardb.net',
   	 user: 'b97ac0ec9c55a7',
	 password: process.env.DB_PASSWORD, //find how to do this properly
	 database: 'heroku_bcd0fd1226bfc07'
 })
 
 function getConnection(){
	 return pool
 }