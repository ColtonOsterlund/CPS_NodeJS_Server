app.get("/api/cows/:cow_id", authorizeUser, (req, res) => {

    getConnection().query("SELECT * FROM cows WHERE cow_id = ?", [req.params.cow_id], (err, rows, fields) => {
 
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

app.get("/api/cows/:cow_id/calciulate_tests", authorizeUser, (req, res) => {

    getConnection().query("SELECT * FROM calciulate_tests WHERE cow_id = ?", [req.params.cow_id], (err, rows, fields) => {
 
        if(err != null){
            return res.status(500).send(err)
        }
        
        var jsonObjects = []

        objects.forEach(function(calciulate_test){
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


app.post("/api/cows/:cow_id/calciulate_tests", authorizeUser, (req, res) => {


})


app.put("/api/cows/:cow_id", authorizeUser, (req, res) => {


})


app.delete("/api/cows/:cow_id", authorizeUser, (req, res) => {


})

