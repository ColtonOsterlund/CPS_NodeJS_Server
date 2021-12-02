var express = require('express')
router = express.Router()
const { v4: uuidv4 } = require("uuid")
const bcrypt = require('bcryptjs')
const { database, encrypt, decrypt } = require('../database')
const { authenticateToken } = require('../middleware/authentication')


router.get("/api/users", authenticateToken, (req, res) => {

    database().query("SELECT * FROM users", [], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }

        var jsonObjects = []

        rows.forEach(function (user) {
            var userObject = {
                id: user.id,
                email: decrypt(user.email),
                admin_flag: decrypt(user.admin_flag)
            }

            jsonObjects.push(userObject)

        })

        return res.status(200).send(JSON.stringify(jsonObjects))

    })

})


router.post("/api/users", (req, res) => {

    var query = "INSERT INTO users (id, email, password, first_name, last_name, main_address, secondary_address, city, province, country, zip_code, phone, admin_flag) VALUES ?;"

    var values = [[]]

    req.body.users.forEach(function (user) {
        var userValues = []

        try{
            const hashPass = bcrypt.hashSync(user.password, 10)
            userValues.push(uuidv4())
            userValues.push(encrypt(user.email))
            userValues.push(hashPass)
            userValues.push(encrypt(user.first_name))
            userValues.push(encrypt(user.last_name))
            userValues.push(encrypt(user.main_address))
            userValues.push(encrypt(user.secondary_address))
            userValues.push(encrypt(user.city))
            userValues.push(encrypt(user.province))
            userValues.push(encrypt(user.country))
            userValues.push(encrypt(user.zip_code))
            userValues.push(encrypt(user.phone))
            userValues.push(encrypt(user.admin_flag))

            values.push(userValues)
        }
        catch(e){
            res.status(500).send(JSON.stringify(e))
        }
        
    });

    database().query(query, values, (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }
        else{
            return res.status(201).send(JSON.stringify("Success"))
        }

    })

})



router.post("/api/users/login", (req, res) => {

    database().query("SELECT * FROM users where email = ?", [encrypt(req.body.email)], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }
        else{

            bcrypt.compare(req.body.password, rows[0].password, function(err, response){
        
                if(err){
                    return res.status(500).send(JSON.stringify(err))
                }
                else if(response){
                    //passwords match
                    const { password, ...payload } = rows[0]

                    token = jwt.sign({_id: payload}, process.env.TOKEN_SECRET, {expiresIn: '168h'})
                    return res.status(200).send(JSON.stringify({token}))
                }
                else{
                    //passwords dont match
                    return res.status(400).send(JSON.stringify("Incorrect email address or password"))
                }
            })

        }

    })

})


router.get("/api/users/logout", authenticateToken, (req, res) => {

    database().query("INSERT INTO blacklisted_jwts (token, expiration) VALUES (?, ?)", [token, req.user.exp], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }
        else{
            return res.status(200).send(JSON.stringify("Success"))
        }

    })

})


module.exports = router;