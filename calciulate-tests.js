app.get("/api/calciulate_tests/:calciulate_test_id", authorizeUser, (req, res) => {

    getConnection().query("SELECT * FROM calciulate_tests WHERE calciulate_test_id = ? AND user_id = ?", [encrypt(req.params.calciulate_test_id), encrypt(req.header("user_id"))], (err, rows, fields) => {
 
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
                days_in_milk: decrypt(calciulate_test.days_in_milk),
                dry_off_day: decrypt(calciulate_test.dry_off_day),
                mastitis_history: decrypt(calciulate_test.mastitis_history),
                method_of_dry_off: decrypt(calciulate_test.method_of_dry_off),
                daily_milk_average: decrypt(calciulate_test.daily_milk_average),
                parity: decrypt(calciulate_test.parity),
                reproduction_status: decrypt(calciulate_test.reproduction_status),
                number_of_times_bred: decrypt(calciulate_test.number_of_times_bred),
                farm_breeding_index: decrypt(calciulate_test.farm_breeding_index),
                lactation_number: decrypt(calciulate_test.lactation_number),
                days_carried_calf_if_pregnant: decrypt(calciulate_test.days_carried_calf_if_pregnant),
                projected_due_date: decrypt(calciulate_test.projected_due_date),
                current_305_day_milk: decrypt(calciulate_test.current_305_day_milk),
                current_somatic_cell_count: decrypt(calciulate_test.current_somatic_cell_count),
                linear_score_at_last_test: decrypt(calciulate_test.linear_score_at_last_test),
                date_of_last_clinical_mastitis: decrypt(calciulate_test.date_of_last_clinical_mastitis),
                chain_visible_id: decrypt(calciulate_test.chain_visible_id),
                animal_registration_no_nlid: decrypt(calciulate_test.animal_registration_no_nlid),
                dam_breed: decrypt(calciulate_test.dam_breed),
                culled: decrypt(calciulate_test.culled),
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

    var id = encrypt(req.body.id)
    var calciulate_test_id = encrypt(req.body.calciulate_test_id)
    var units = encrypt(req.body.units)
    var millivolts = encrypt(req.body.millivolts)
    var result = encrypt(req.body.result)
    var milk_fever = encrypt(req.body.milk_fever)
    var follow_up_num = encrypt(req.body.follow_up_num)
    var sync_flag = encrypt(req.body.sync_flag)
    var deleted_flag = encrypt(req.body.deleted_flag)
    var days_in_milk = encrypt(req.body.days_in_milk)
    var dry_off_day = encrypt(req.body.dry_off_day)
    var mastitis_history = encrypt(req.body.mastitis_history)
    var method_of_dry_off = encrypt(req.body.method_of_dry_off)
    var daily_milk_average = encrypt(req.body.daily_milk_average)
    var parity = encrypt(req.body.parity)
    var reproduction_status = encrypt(req.body.reproduction_status)
    var number_of_times_bred = encrypt(req.body.number_of_times_bred)
    var farm_breeding_index = encrypt(req.body.farm_breeding_index)
    var lactation_number = encrypt(req.body.lactation_number)
    var days_carried_calf_if_pregnant = encrypt(req.body.days_carried_calf_if_pregnant)
    var projected_due_date = encrypt(req.body.projected_due_date)
    var current_305_day_milk = encrypt(req.body.current_305_day_milk)
    var current_somatic_cell_count = encrypt(req.body.current_305_day_milk)
    var linear_score_at_last_test = encrypt(req.body.linear_score_at_last_test)
    var date_of_last_clinical_mastitis = encrypt(req.body.date_of_last_clinical_mastitis)
    var chain_visible_id = encrypt(req.body.chain_visible_id)
    var animal_registration_no_nlid = encrypt(req.body.animal_registration_no_nlid)
    var dam_breed = encrypt(req.body.dam_breed)
    var culled = encrypt(req.body.culled)
    var cow_id = encrypt(req.params.cow_id)
    var user_id = encrypt(req.header("user_id"))

    getConnection().query("UPDATE calciulate_tests id = ?, calciulate_test_id = ?, units = ?, millivolts = ?, result = ?, milk_fever = ?, folllow_up_num = ?, sync_flag = ?, deleted_flag = ?, days_in_milk = ?, "
    + "dry_off_day = ?, mastitis_history = ?, method_of_dry_off = ?, daily_milk_average = ?, parity = ?, reproduction_status = ?, number_of_times_bred = ?, farm_breeding_index = ?, lactation_number = ?, days_carried_calf_if_pregnant = ?, "
    + " projected_due_date = ?, current_305_day_milk = ?, current_somatic_cell_count = ?, linear_score_at_last_test = ?, date_of_last_clinical_mastitis = ?, chain_visible_id = ?, animal_registration_no_nlid = ?, dam_breed = ?, culled = ?, cow_id = ?, user_id = ? "
    + "WHERE calciulate_test_id = ? AND user_id = ?", 
    [id, calciulate_test_id, units, millivolts, result, milk_fever, follow_up_num, sync_flag, deleted_flag, days_in_milk, dry_off_day, 
    mastitis_history, method_of_dry_off, daily_milk_average, parity, reproduction_status, number_of_times_bred, farm_breeding_index, lactation_number, 
    days_carried_calf_if_pregnant, projected_due_date, current_305_day_milk, current_somatic_cell_count, linear_score_at_last_test, date_of_last_clinical_mastitis,
    chain_visible_id, animal_registration_no_nlid, dam_breed, culled, cow_id, user_id, encrypt(req.params.calciulate_test_id), encrypt(req.header("user_id"))], (err, rows, fields) => {
 
        if(err != null){
            return res.status(500).send(err)
        }
        
        return res.status(200).send("Success")

    })
})

app.delete("/api/calciulate_tests/:calciulate_test_id", authorizeUser, (req, res) => {

    getConnection().query("DELETE FROM calciulate_tests WHERE calciulate_test_id = ? AND user_id = ?", [encrypt(req.params.calciulate_test_id), encrypt(req.header("user_id"))], (err, rows, fields) => {
 
        if(err != null){
            return res.status(500).send(err)
        }
        
        return res.status(200).send("Success")

    })

})