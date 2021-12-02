var express = require('express')
router = express.Router()
const { v4: uuidv4 } = require("uuid")
var database = require('../database')
const { authenticateToken } = require('../middleware/authentication')

router.get("/api/cows/:cow_id", authenticateToken, (req, res) => {

    database().query("SELECT * FROM cows WHERE cow_id = ? AND user_id = ?", [req.params.cow_id, req.user.id], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }

        var jsonObjects = []

        rows.forEach(function (cow) {
            var cowObject = {
                id: cow.id,
                cow_id: cow.cow_id,
                days_in_milk: database.decrypt(cow.days_in_milk),
                dry_off_day: database.decrypt(cow.dry_off_day),
                mastitis_history: database.decrypt(cow.mastitis_history),
                method_of_dry_off: database.decrypt(cow.method_of_dry_off),
                daily_milk_average: database.decrypt(cow.daily_milk_average),
                parity: database.decrypt(cow.parity),
                reproduction_status: database.decrypt(cow.reproduction_status),
                number_of_times_bred: database.decrypt(cow.number_of_times_bred),
                farm_breeding_index: database.decrypt(cow.farm_breeding_index),
                lactation_number: database.decrypt(cow.lactation_number),
                days_carried_calf_if_pregnant: database.decrypt(cow.days_carried_calf_if_pregnant),
                projected_due_date: database.decrypt(cow.projected_due_date),
                current_305_day_milk: database.decrypt(cow.current_305_day_milk),
                current_somatic_cell_count: database.decrypt(cow.current_somatic_cell_count),
                linear_score_at_last_test: database.decrypt(cow.linear_score_at_last_test),
                date_of_last_clinical_mastitis: database.decrypt(cow.date_of_last_clinical_mastitis),
                chain_visible_id: database.decrypt(cow.chain_visible_id),
                animal_registration_no_nlid: database.decrypt(cow.animal_registration_no_nlid),
                dam_breed: database.decrypt(cow.dam_breed),
                culled: database.decrypt(cow.culled),
                modify_date: cow.modify_date,
                sync_flag: database.decrypt(cow.sync_flag),
                deleted_flag: database.decrypt(cow.deleted_flag),
                herd_id: cow.herd_id,
                user_id: cow.user_id
            }

            jsonObjects.push(cowObject)

        })

        return res.status(200).send(JSON.stringify(jsonObjects))

    })

})

router.get("/api/cows/:cow_id/calciulate_tests", authenticateToken, (req, res) => {

    database().query("SELECT * FROM calciulate_tests WHERE cow_id = ? AND user_id = ?", [req.params.cow_id, req.user.id], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }

        var jsonObjects = []

        rows.forEach(function (calciulate_test) {
            var calciulate_testObject = {
                id: calciulate_test.id,
                calciulate_test_id: calciulate_test.calciulate_test_id,
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
                cow_id: calciulate_test.cow_id,
                user_id: calciulate_test.user_id
            }

            jsonObjects.push(calciulate_testObject)

        })

        return res.status(200).send(JSON.stringify(jsonObjects))

    })

})

router.post("/api/cows/:cow_id/calciulate_tests", authenticateToken, (req, res) => {

    var query = "INSERT INTO calciulate_tests (id, calciulate_test_id, units, millivolts, result, milk_fever, folllow_up_num, sync_flag, deleted_flag, days_in_milk, "
        + "dry_off_day, mastitis_history, method_of_dry_off, daily_milk_average, parity, reproduction_status, number_of_times_bred, farm_breeding_index, lactation_number, days_carried_calf_if_pregnant, "
        + " projected_due_date, current_305_day_milk, current_somatic_cell_count, linear_score_at_last_test, date_of_last_clinical_mastitis, chain_visible_id, animal_registration_no_nlid, dam_breed, culled, cow_id, user_id) VALUES ?"

    var values = [[]]

    async.forEachOf(req.body.calciulate_tests, function (calciulate_test, i, callback) {
        var calciulate_testValues = []

        database().query("SELECT * FROM cow WHERE cow_id = ? AND user_id = ?", [req.params.cow_id, req.user.id], (err, rows, fields) => {

            if (err != null) {
                callback(err)
            }

            calciulate_testValues.push(uuidv4())
            calciulate_testValues.push(calciulate_test.calciulate_test_id)
            calciulate_testValues.push(database.encrypt(calciulate_test.units))
            calciulate_testValues.push(database.encrypt(calciulate_test.millivolts))
            calciulate_testValues.push(database.encrypt(calciulate_test.result))
            calciulate_testValues.push(database.encrypt(calciulate_test.milk_fever))
            calciulate_testValues.push(database.encrypt(calciulate_test.follow_up_num))
            calciulate_testValues.push(database.encrypt(calciulate_test.sync_flag))
            calciulate_testValues.push(database.encrypt(calciulate_test.deleted_flag))
            calciulate_testValues.push(rows[0].days_in_milk)
            calciulate_testValues.push(rows[0].dry_off_day)
            calciulate_testValues.push(rows[0].mastitis_history)
            calciulate_testValues.push(rows[0].method_of_dry_off)
            calciulate_testValues.push(rows[0].daily_milk_average)
            calciulate_testValues.push(rows[0].parity)
            calciulate_testValues.push(rows[0].reproduction_status)
            calciulate_testValues.push(rows[0].number_of_times_bred)
            calciulate_testValues.push(rows[0].farm_breeding_index)
            calciulate_testValues.push(rows[0].lactation_number)
            calciulate_testValues.push(rows[0].days_carried_calf_if_pregnant)
            calciulate_testValues.push(rows[0].projected_due_date)
            calciulate_testValues.push(rows[0].current_305_day_milk)
            calciulate_testValues.push(rows[0].current_somatic_cell_count)
            calciulate_testValues.push(rows[0].linear_score_at_last_test)
            calciulate_testValues.push(rows[0].date_of_last_clinical_mastitis)
            calciulate_testValues.push(rows[0].chain_visible_id)
            calciulate_testValues.push(rows[0].animal_registration_no_nlid)
            calciulate_testValues.push(rows[0].dam_breed)
            calciulate_testValues.push(rows[0].culled)
            calciulate_testValues.push(req.params.cow_id)
            calciulate_testValues.push(req.user.id)

        })

        values.push(calciulate_testValues)

    }, function (err) {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }
        else {
            database().query(query, values, (err, rows, fields) => {

                if (err != null) {
                    return res.status(500).send(JSON.stringify(err))
                }

                return res.status(200).send(JSON.stringify("Success"))

            })
        }
    });

})

router.put("/api/cows/:cow_id", authenticateToken, (req, res) => {

    var id = req.body.id
    var cow_id = req.body.cow_id
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
    var current_somatic_cell_count = database.encrypt(req.body.current_somatic_cell_count)
    var linear_score_at_last_test = database.encrypt(req.body.linear_score_at_last_test)
    var date_of_last_clinical_mastitis = database.encrypt(req.body.date_of_last_clinical_mastitis)
    var chain_visible_id = database.encrypt(req.body.chain_visible_id)
    var animal_registration_no_nlid = database.encrypt(req.body.animal_registration_no_nlid)
    var dam_breed = database.encrypt(req.body.dam_breed)
    var culled = database.encrypt(req.body.culled)
    var modify_date = database.encrypt(req.body.modify_date)
    var sync_flag = database.encrypt(req.body.sync_flag)
    var deleted_flag = database.encrypt(req.body.deleted_flag)
    var herd_id = req.body.herd_id
    var user_id = req.user.id

    database().query("UPDATE cow SET id = ?, cow_id = ?, days_in_milk = ?, dry_off_day = ?, mastitis_history = ?, method_of_dry_off = ?, daily_milk_average = ?, parity = ?, reproduction_status = ?, number_of_times_bred = ?, farm_breeding_index = ?, lactation_number = ?, days_carried_calf_if_pregnant = ?, projected_due_date = ?, "
        + "current_305_day_milk = ?, current_somatic_cell_count = ?, linear_score_at_last_test = ?, date_of_last_clinical_mastitis = ?, chain_visible_id = ?, animal_registration_no_nlid = ?, dam_breed = ?, culled = ?, modify_date = ?, sync_flag = ?, deleted_flag = ?, herd_id = ?, user_id = ? WHERE cow_id = ? AND user_id = ?",
        [id, cow_id, days_in_milk, dry_off_day, mastitis_history, method_of_dry_off, daily_milk_average, parity, reproduction_status, number_of_times_bred, farm_breeding_index, lactation_number, days_carried_calf_if_pregnant, projected_due_date,
            current_305_day_milk, current_somatic_cell_count, linear_score_at_last_test, date_of_last_clinical_mastitis, chain_visible_id, animal_registration_no_nlid, dam_breed, culled, modify_date, sync_flag, deleted_flag, herd_id, user_id, req.params.cow_id, req.user.id], (err, rows, fields) => {

                if (err != null) {
                    return res.status(500).send(JSON.stringify(err))
                }

                return res.status(200).send(JSON.stringify("Success"))

            })
})

router.delete("/api/cows/:cow_id", authenticateToken, (req, res) => {

    database().query("DELETE FROM cow WHERE cow_id = ? AND user_id = ?", [req.params.cow_id, req.user.id], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }

        return res.status(200).send(JSON.stringify("Success"))

    })

})

module.exports = router;

