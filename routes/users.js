var express = require('express')
router = express.Router()
const { v4: uuidv4 } = require("uuid")
var database = require('../database')
const jwt = require('jsonwebtoken');


router.get("/api/users", (req, res) => {

    database().query("SELECT * FROM users", [], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(err)
        }

        var jsonObjects = []

        rows.forEach(function (user) {
            var userObject = {
                id: database.decrypt(user.id),
                email: database.decrypt(user.email),
                admin_flag: database.decrypt(user.admin_flag)
            }

            jsonObjects.push(userObject)

        })

        return res.status(200).send(JSON.stringify(jsonObjects))

    })

})


router.post("/api/users", (req, res) => {

    var query = "INSERT INTO users (id, email, password, first_name, last_name, main_address, secondary_address, city, province, country, zip_code, phone, admin_flag) VALUES ?"

    var values = [[]]

    req.body.users.forEach(function (user) {
        var userValues = []
        userValues.push()

        values.push(userValues)
    });

    database().query(query, values, (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(err)
        }

        return res.status(200).send("Success")

    })

})

router.post("/api/users/login", (req, res) => {

    return res.status(500).send("Route neot yet implemented")

})


router.get("/api/users/logout", (req, res) => {

    if(req.header("user_id") == null){
        return res.status(400).send("user_id header is null")
    }

    var expirationTimestamp = ((new Date().getTime() / 86400000) + 7) * 86400000; //UNIX timestamp 1 week in the future

    database().query("INSERT INTO blacklisted_jwts (token, expiration) VALUES ?", [encrypt(req.header("user_authentication")), expirationTimestamp], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(err)
        }

        return res.status(200).send("Success")

    })

})


//extra router functions 
router = {
    authenticateToken: (req, res, next) => {
      const token = req.header("user_authentication")
  
      if (token == null)
        return res.status(403).json({ message: 'Invalid token' });
  
      jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).json({ message: 'Invalid token' });
  
        req.user = user;
        req.token = token;
  
        next();
      });
    },
};



module.exports = router;