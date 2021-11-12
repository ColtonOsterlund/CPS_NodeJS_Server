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


})

app.delete("/api/calciulate_tests/:calciulate_test_id", authorizeUser, (req, res) => {


})