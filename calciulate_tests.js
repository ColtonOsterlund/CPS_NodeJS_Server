var express = require('express')
router = express.Router()
const { v4: uuidv4 } = require("uuid")
var database = require('./database')

router.get("/api/calciulate_tests/:calciulate_test_id", (req, res) => {

    if(req.header("user_id") == null){
        return res.status(400).send("user_id header is null")
    }

    database().query("SELECT * FROM calciulate_tests WHERE calciulate_test_id = ? AND user_id = ?", [database.encrypt(req.params.calciulate_test_id), database.encrypt(req.header("user_id"))], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(err)
        }

        var jsonObjects = []

        rows.forEach(function (strip_test) {
            var calciulate_testObject = {
                id: database.decrypt(calciulate_test.id),
                calciulate_test_id: database.decrypt(calciulate_test.calciulate_test_id),
                units: database.decrypt(calciulate_test.units),
                millivolts: database.decrypt(calciulate_test.millivolts),
                result: database.decrypt(calciulate_test.result),
                milk_fever: database.decrypt(calciulate_test.milk_fever),
                follow_up_num: database.decrypt(calciulate_test.follow_up_num),
                days_in_milk: database.decrypt(calciulate_test.days_in_milk),
                dry_off_day: database.decrypt(calciulate_test.dry_off_day),
                mastitis_history: database.decrypt(calciulate_test.mastitis_history),
                method_of_dry_off: database.decrypt(calciulate_test.method_of_dry_off),
                daily_milk_average: database.decrypt(calciulate_test.daily_milk_average),
                parity: database.decrypt(calciulate_test.parity),
                reproduction_status: database.decrypt(calciulate_test.reproduction_status),
                number_of_times_bred: database.decrypt(calciulate_test.number_of_times_bred),
                farm_breeding_index: database.decrypt(calciulate_test.farm_breeding_index),
                lactation_number: database.decrypt(calciulate_test.lactation_number),
                days_carried_calf_if_pregnant: database.decrypt(calciulate_test.days_carried_calf_if_pregnant),
                projected_due_date: database.decrypt(calciulate_test.projected_due_date),
                current_305_day_milk: database.decrypt(calciulate_test.current_305_day_milk),
                current_somatic_cell_count: database.decrypt(calciulate_test.current_somatic_cell_count),
                linear_score_at_last_test: database.decrypt(calciulate_test.linear_score_at_last_test),
                date_of_last_clinical_mastitis: database.decrypt(calciulate_test.date_of_last_clinical_mastitis),
                chain_visible_id: database.decrypt(calciulate_test.chain_visible_id),
                animal_registration_no_nlid: database.decrypt(calciulate_test.animal_registration_no_nlid),
                dam_breed: database.decrypt(calciulate_test.dam_breed),
                culled: database.decrypt(calciulate_test.culled),
                sync_flag: database.decrypt(calciulate_test.sync_flag),
                deleted_flag: database.decrypt(calciulate_test.deleted_flag),
                cow_id: database.decrypt(calciulate_test.cow_id),
                user_id: database.decrypt(calciulate_test.user_id)
            }

            jsonObjects.push(calciulate_testObject)

        })

        return res.status(200).send(JSON.stringify(jsonObjects))

    })

})

router.put("/api/calciulate_tests/:calciulate_test_id", (req, res) => {

    if(req.header("user_id") == null){
        return res.status(400).send("user_id header is null")
    }

    var id = database.encrypt(req.body.id)
    var calciulate_test_id = database.encrypt(req.body.calciulate_test_id)
    var units = database.encrypt(req.body.units)
    var millivolts = database.encrypt(req.body.millivolts)
    var result = database.encrypt(req.body.result)
    var milk_fever = database.encrypt(req.body.milk_fever)
    var follow_up_num = database.encrypt(req.body.follow_up_num)
    var sync_flag = database.encrypt(req.body.sync_flag)
    var deleted_flag = database.encrypt(req.body.deleted_flag)
    var days_in_milk = database.encrypt(req.body.days_in_milk)
    var dry_off_day = database.encrypt(req.body.dry_off_day)
    var mastitis_history = database.encrypt(req.body.mastitis_history)
    var method_of_dry_off = database.encrypt(req.body.method_of_dry_off)
    var daily_milk_average = database.encrypt(req.body.daily_milk_average)
    var parity = database.encrypt(req.body.parity)
    var reproduction_status = database.encrypt(req.body.reproduction_status)
    var number_of_times_bred = database.encrypt(req.body.number_of_times_bred)
    var farm_breeding_index = database.encrypt(req.body.farm_breeding_index)
    var lactation_number = database.encrypt(req.body.lactation_number)
    var days_carried_calf_if_pregnant = database.encrypt(req.body.days_carried_calf_if_pregnant)
    var projected_due_date = database.encrypt(req.body.projected_due_date)
    var current_305_day_milk = database.encrypt(req.body.current_305_day_milk)
    var current_somatic_cell_count = database.encrypt(req.body.current_305_day_milk)
    var linear_score_at_last_test = database.encrypt(req.body.linear_score_at_last_test)
    var date_of_last_clinical_mastitis = database.encrypt(req.body.date_of_last_clinical_mastitis)
    var chain_visible_id = database.encrypt(req.body.chain_visible_id)
    var animal_registration_no_nlid = database.encrypt(req.body.animal_registration_no_nlid)
    var dam_breed = database.encrypt(req.body.dam_breed)
    var culled = database.encrypt(req.body.culled)
    var cow_id = database.encrypt(req.params.cow_id)
    var user_id = database.encrypt(req.header("user_id"))

    database().query("UPDATE calciulate_tests id = ?, calciulate_test_id = ?, units = ?, millivolts = ?, result = ?, milk_fever = ?, folllow_up_num = ?, sync_flag = ?, deleted_flag = ?, days_in_milk = ?, "
        + "dry_off_day = ?, mastitis_history = ?, method_of_dry_off = ?, daily_milk_average = ?, parity = ?, reproduction_status = ?, number_of_times_bred = ?, farm_breeding_index = ?, lactation_number = ?, days_carried_calf_if_pregnant = ?, "
        + " projected_due_date = ?, current_305_day_milk = ?, current_somatic_cell_count = ?, linear_score_at_last_test = ?, date_of_last_clinical_mastitis = ?, chain_visible_id = ?, animal_registration_no_nlid = ?, dam_breed = ?, culled = ?, cow_id = ?, user_id = ? "
        + "WHERE calciulate_test_id = ? AND user_id = ?",
        [id, calciulate_test_id, units, millivolts, result, milk_fever, follow_up_num, sync_flag, deleted_flag, days_in_milk, dry_off_day,
            mastitis_history, method_of_dry_off, daily_milk_average, parity, reproduction_status, number_of_times_bred, farm_breeding_index, lactation_number,
            days_carried_calf_if_pregnant, projected_due_date, current_305_day_milk, current_somatic_cell_count, linear_score_at_last_test, date_of_last_clinical_mastitis,
            chain_visible_id, animal_registration_no_nlid, dam_breed, culled, cow_id, user_id, database.encrypt(req.params.calciulate_test_id), database.encrypt(req.header("user_id"))], (err, rows, fields) => {

                if (err != null) {
                    return res.status(500).send(err)
                }

                return res.status(200).send("Success")

            })
})

router.delete("/api/calciulate_tests/:calciulate_test_id", (req, res) => {

    if(req.header("user_id") == null){
        return res.status(400).send("user_id header is null")
    }

    database().query("DELETE FROM calciulate_tests WHERE calciulate_test_id = ? AND user_id = ?", [database.encrypt(req.params.calciulate_test_id), database.encrypt(req.header("user_id"))], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(err)
        }

        return res.status(200).send("Success")

    })

})

module.exports = router;