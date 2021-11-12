app.get("/api/herds", authorizeUser, (req, res) => {

    getConnection().query("SELECT * FROM herds", [], (err, rows, fields) => {
 
        if(err != null){
            return res.status(500).send(err)
        }
        
        var jsonObjects = []

        objects.forEach(function(herd){
            var herdObject = {
                id: decrypt(herd.id),
                herd_id: decrypt(herd.herd_id),
                location: decrypt(herd.location),
                milking_system: decrypt(herd.milking_system),
                pin: decrypt(herd.pin),
                modify_date: decrypt(herd.modify_date),
                sync_flag: decrypt(herd.sync_flag),
                deleted_flag: decrypt(herd.deleted_flag),
                user_id: decrypt(herd.user_id)
            }

            jsonObjects.push(herdObject)

        })

        return res.status(200).send(JSON.stringify(jsonObjects))

    })

})

app.get("/api/herds/:herd_id", authorizeUser, (req, res) => {

    getConnection().query("SELECT * FROM herds WHERE herd_id = ?", [req.params.herd_id], (err, rows, fields) => {
 
        if(err != null){
            return res.status(500).send(err)
        }
        
        var jsonObjects = []

        objects.forEach(function(herd){
            var herdObject = {
                id: decrypt(herd.id),
                herd_id: decrypt(herd.herd_id),
                location: decrypt(herd.location),
                milking_system: decrypt(herd.milking_system),
                pin: decrypt(herd.pin),
                modify_date: decrypt(herd.modify_date),
                sync_flag: decrypt(herd.sync_flag),
                deleted_flag: decrypt(herd.deleted_flag),
                user_id: decrypt(herd.user_id)
            }

            jsonObjects.push(herdObject)

        })

        return res.status(200).send(JSON.stringify(jsonObjects))

    })

})

app.get("/api/herds/:herd_id/cows", authorizeUser, (req, res) => {

    getConnection().query("SELECT * FROM cows WHERE herd_id = ?", [req.params.herd_id], (err, rows, fields) => {
 
        if(err != null){
            return res.status(500).send(err)
        }
        
        var jsonObjects = []

        objects.forEach(function(cow){
            var cowObject = {
                id: decrypt(cow.id),
				cow_id: decrypt(cow.cow_id),
                days_in_milk: decrypt(cow.days_in_milk),
                dry_off_day: decrypt(cow.dry_off_day),
                mastitis_history: decrypt(cow.mastitis_history),
                method_of_dry_off: decrypt(cow.method_of_dry_off),
                daily_milk_average: decrypt(cow.daily_milk_average),
                parity: decrypt(cow.parity),
                reproduction_status: decrypt(cow.reproduction_status),
                number_of_times_bred: decrypt(cow.number_of_times_bred),
                farm_breeding_index: decrypt(cow.farm_breeding_index),
                lactation_number: decrypt(cow.lactation_number),
                days_carried_calf_if_pregnant: decrypt(cow.days_carried_calf_if_pregnant),
                projected_due_date: decrypt(cow.projected_due_date),
                current_305_day_milk: decrypt(cow.current_305_day_milk),
                current_somatic_cell_count: decrypt(cow.current_somatic_cell_count),
                linear_score_at_last_test: decrypt(cow.linear_score_at_last_test),
                date_of_last_clinical_mastitis: decrypt(cow.date_of_last_clinical_mastitis),
                chain_visible_id: decrypt(cow.chain_visible_id),
                animal_registration_no_nlid: decrypt(cow.animal_registration_no_nlid),
                dam_breed: decrypt(cow.dam_breed),
                culled: decrypt(cow.culled),
                modify_date: decrypt(cow.modify_date),
                sync_flag: decrypt(cow.sync_flag),
                deleted_flag: decrypt(cow.deleted_flag),
                herd_id: decrypt(cow.herd_id),
                user_id: decrypt(cow.user_id)
            }

            jsonObjects.push(cowObject)

        })

        return res.status(200).send(JSON.stringify(jsonObjects))

    })

})


app.post("/api/herds", authorizeUser, (req, res) => {

    var id = encrypt(req.body.id)
    var herd_id = encrypt(req.body.herd_id)
	var location = encrypt(req.body.location)
	var milkingSystem = encrypt(req.body.milkingSystem)
	var pin = encrypt(req.body.pin)
    var modify_date = encrypt(req.body.modify_date)
    var sync_flag = encrypt(req.body.sync_flag)
    var deleted_flag = encrypt(req.body.deleted_flag)
	var user_id = encrypt(req.header("user_id"))

    getConnection().query("INSERT INTO herd (id, herd_id, location, milkingSystem, pin, modify_date, sync_flag, deleted_flag, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
    [id, herd_id, location, milkingSystem, pin, modify_date, sync_flag, deleted_flag, user_id], (err, rows, fields) => {
 
        if(err != null){
            return res.status(500).send(err)
        }
        
        return res.status(200).send("Success")

    })

})


app.post("/api/herds/:herd_id/cows", authorizeUser, (req, res) => {

    var id = encrypt(req.body.id),
	var cow_id = encrypt(req.body.cow_id),
    var days_in_milk = encrypt(req.body.days_in_milk),
    var dry_off_day = encrypt(req.body.dry_off_day),
    var mastitis_history = encrypt(req.body.mastitis_history),
    var method_of_dry_off = encrypt(req.body.method_of_dry_off),
    var daily_milk_average = encrypt(req.body.daily_milk_average),
    var parity = encrypt(req.body.parity),
    var reproduction_status = encrypt(req.body.reproduction_status),
    var number_of_times_bred = encrypt(req.body.number_of_times_bred),
    var farm_breeding_index = encrypt(req.body.farm_breeding_index),
    var lactation_number = encrypt(req.body.lactation_number),
    var days_carried_calf_if_pregnant = encrypt(req.body.days_carried_calf_if_pregnant),
    var projected_due_date = encrypt(req.body.projected_due_date),
    var current_305_day_milk = encrypt(req.body.current_305_day_milk),
    var current_somatic_cell_count = encrypt(req.body.current_somatic_cell_count),
    var linear_score_at_last_test = encrypt(req.body.linear_score_at_last_test),
    var date_of_last_clinical_mastitis = encrypt(req.body.date_of_last_clinical_mastitis),
    var chain_visible_id = encrypt(req.body.chain_visible_id),
    var animal_registration_no_nlid = encrypt(req.body.animal_registration_no_nlid),
    var dam_breed = encrypt(req.body.dam_breed),
    var culled = encrypt(req.body.culled),
    var modify_date = encrypt(req.body.modify_date),
    var sync_flag = encrypt(req.body.sync_flag),
    var deleted_flag = encrypt(req.body.deleted_flag),
    var herd_id = encrypt(req.body.herd_id),
    var user_id = encrypt(req.body.user_id)

    getConnection().query("INSERT INTO cow (id, cow_id, days_in_milk, dry_off_day, mastitis_history, method_of_dry_off, daily_milk_average, parity, reproduction_status, number_of_times_bred, farm_breeding_index, lactation_number, days_carried_calf_if_pregnant, projected_due_date, "
    + "current_305_day_milk, current_somatic_cell_count, linear_score_at_last_test, date_of_last_clinical_mastitis, chain_visible_id, animal_registration_no_nlid, dam_breed, culled, modify_date, sync_flag, deleted_flag, herd_id, user_id)" 
    + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
    [id, cow_id, days_in_milk, dry_off_day, mastitis_history, method_of_dry_off, daily_milk_average, parity, reproduction_status, number_of_times_bred, farm_breeding_index, lactation_number, days_carried_calf_if_pregnant, projected_due_date, 
        current_305_day_milk, current_somatic_cell_count, linear_score_at_last_test, date_of_last_clinical_mastitis, chain_visible_id, animal_registration_no_nlid, dam_breed, culled, modify_date, sync_flag, deleted_flag, herd_id, user_id], (err, rows, fields) => {
 
        if(err != null){
            return res.status(500).send(err)
        }
        
        return res.status(200).send("Success")

    })

})


app.put("/api/herds/:herd_id", authorizeUser, (req, res) => {


})


app.delete("/api/herds/:herd_id", authorizeUser, (req, res) => {


})