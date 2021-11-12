app.get("/api/calciulate_tests/:calciulate_test_id", authorizeUser, (req, res) => {

    getConnection().query("SELECT * FROM calciulate_tests WHERE calciulate_test_id = ?", [req.params.calciulate_test_id], (err, rows, fields) => {
 
        if(err != null){
            return res.status(500).send(err)
        }
        
        var jsonObjects = []

        objects.forEach(function(strip_test){
            var calciulate_testObject = {
                id: decrypt(calciulate_test.id),
                calciulate_test_id: decrypt(calciulate_test.calciulate_test_id),
                units: decrypt(calciulate_test.units),
                millivolts: decrypt(calciulate_test.millivolts),
                result: decrypt(calciulate_test.result),
                milk_fever: decrypt(calciulate_test.milk_fever),
                follow_up_num: decrypt(calciulate_test.follow_up_num),
                sync_flag: decrypt(calciulate_test.sync_flag),
                deleted_flag: decrypt(calciulate_test.deleted_flag),
                cow_id: decrypt(calciulate_test.cow_id),
                user_id: decrypt(calciulate_test.user_id)
            }

            jsonObjects.push(calciulate_testObject)

        })

        return res.status(200).send(JSON.stringify(jsonObjects))

    })

})


app.put("/api/calciulate_tests/:calciulate_test_id", authorizeUser, (req, res) => {


})

app.delete("/api/calciulate_tests/:calciulate_test_id", authorizeUser, (req, res) => {


})