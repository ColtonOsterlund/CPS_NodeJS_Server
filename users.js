var express = require('express')
router = express.Router()
const { v4: uuidv4 } = require("uuid")
var database = require('./database')

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

router.get("/api/users/logout", (req, res) => {

    if(req.header("user_id") == null){
        return res.status(400).send("user_id header is null")
    }


})

router.post("/api/users", (req, res) => {


})

router.post("/api/users/login", (req, res) => {


})

module.exports = router;