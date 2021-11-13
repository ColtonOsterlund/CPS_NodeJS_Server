app.get("/api/users", authorizeUser, (req, res) => {

    getConnection().query("SELECT * FROM users", [], (err, rows, fields) => {
 
        if(err != null){
            return res.status(500).send(err)
        }
        
        var jsonObjects = []

        objects.forEach(function(user){
            var userObject = {
                id: decrypt(user.id),
                email: decrypt(user.email),
                admin_flag: decrypt(user.admin_flag)
            }

            jsonObjects.push(userObject)

        })

        return res.status(200).send(JSON.stringify(jsonObjects))

    })

})

app.get("/api/users/logout", authorizeUser, (req, res) => {


})

app.post("/api/users", authorizeUser, (req, res) => {


})

app.post("/api/users/login", authorizeUser, (req, res) => {


})