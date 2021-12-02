var express = require('express')
router = express.Router()
const { v4: uuidv4 } = require("uuid")
var database = require('../database')
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

        bcrypt.hash(req.body.password, 10, function(err, hashPass){
            if(err){
                console.log("error while hashing password: " + err)
                return res.status(500).send(JSON.stringify(err))	
            }
            else{
                userValues.push(uuidv4())
                userValues.push(database.encrypt(user.email))
                userValues.push(hashPass)
                userValues.push(database.encrypt(user.first_name))
                userValues.push(database.encrypt(user.last_name))
                userValues.push(database.encrypt(user.main_address))
                userValues.push(database.encrypt(user.secondary_address))
                userValues.push(database.encrypt(user.city))
                userValues.push(database.encrypt(user.province))
                userValues.push(database.encrypt(user.country))
                userValues.push(database.encrypt(user.zip_code))
                userValues.push(database.encrypt(user.phone))
                userValues.push(database.encrypt(user.admin_flag))
    
                values.push(userValues)

                database().query(query, values, (err, rows, fields) => {

                    if (err != null) {
                        return res.status(500).send(JSON.stringify(err))
                    }
                    else{
                        return res.status(201).send(JSON.stringify("Success"))
                    }
            
                })

            }
        })
    });

})



router.post("/api/users/login", (req, res) => {

    database().query("SELECT * FROM users where email = ?", [database.encrypt(req.body.email)], (err, rows, fields) => {

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