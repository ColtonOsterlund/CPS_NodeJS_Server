var express = require('express')
router = express.Router()
const { v4: uuidv4 } = require("uuid")
const { database, encrypt, decrypt } = require('../database')
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
                culled: cow.culled,
                modify_date: cow.modify_date,
                sync_flag: cow.sync_flag,
                deleted_flag: cow.deleted_flag,
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
                culled: calciulate_test.culled,
                sync_flag: calciulate_test.sync_flag,
                deleted_flag: calciulate_test.deleted_flag,
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
        + " projected_due_date, current_305_day_milk, current_somatic_cell_count, linear_score_at_last_test, date_of_last_clinical_mastitis, chain_visible_id, animal_registration_no_nlid, dam_breed, culled, modify_date, cow_id, user_id) VALUES ?"

    var values = []

    async.forEachOf(req.body.calciulate_tests, function (calciulate_test, i, callback) {
        var calciulate_testValues = []

        database().query("SELECT * FROM cow WHERE cow_id = ? AND user_id = ?", [req.params.cow_id, req.user.id], (err, rows, fields) => {

            if (err != null) {
                callback(err)
            }

            calciulate_testValues.push(uuidv4())
            calciulate_testValues.push(calciulate_test.calciulate_test_id)
            calciulate_testValues.push(encrypt(calciulate_test.units))
            calciulate_testValues.push(encrypt(calciulate_test.millivolts))
            calciulate_testValues.push(encrypt(calciulate_test.result))
            calciulate_testValues.push(encrypt(calciulate_test.milk_fever))
            calciulate_testValues.push(encrypt(calciulate_test.follow_up_num))
            calciulate_testValues.push(calciulate_test.sync_flag)
            calciulate_testValues.push(calciulate_test.deleted_flag)
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
            calciulate_testValues.push(mySqlDateTimeNow())
            calciulate_testValues.push(req.params.cow_id)
            calciulate_testValues.push(req.user.id)

        })

        values.push(calciulate_testValues)

    }, function (err) {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }
        else {
            database().query(query, [values], (err, rows, fields) => {

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
    var current_somatic_cell_count = encrypt(req.body.current_somatic_cell_count)
    var linear_score_at_last_test = encrypt(req.body.linear_score_at_last_test)
    var date_of_last_clinical_mastitis = encrypt(req.body.date_of_last_clinical_mastitis)
    var chain_visible_id = encrypt(req.body.chain_visible_id)
    var animal_registration_no_nlid = encrypt(req.body.animal_registration_no_nlid)
    var dam_breed = encrypt(req.body.dam_breed)
    var culled = req.body.culled
    var modify_date = mySqlDateTimeNow()
    var herd_id = req.body.herd_id
    var user_id = req.user.id

    database().query("UPDATE cow SET id = ?, cow_id = ?, days_in_milk = ?, dry_off_day = ?, mastitis_history = ?, method_of_dry_off = ?, daily_milk_average = ?, parity = ?, reproduction_status = ?, number_of_times_bred = ?, farm_breeding_index = ?, lactation_number = ?, days_carried_calf_if_pregnant = ?, projected_due_date = ?, "
        + "current_305_day_milk = ?, current_somatic_cell_count = ?, linear_score_at_last_test = ?, date_of_last_clinical_mastitis = ?, chain_visible_id = ?, animal_registration_no_nlid = ?, dam_breed = ?, culled = ?, modify_date = ?, herd_id = ?, user_id = ? WHERE cow_id = ? AND user_id = ?",
        [id, cow_id, days_in_milk, dry_off_day, mastitis_history, method_of_dry_off, daily_milk_average, parity, reproduction_status, number_of_times_bred, farm_breeding_index, lactation_number, days_carried_calf_if_pregnant, projected_due_date,
            current_305_day_milk, current_somatic_cell_count, linear_score_at_last_test, date_of_last_clinical_mastitis, chain_visible_id, animal_registration_no_nlid, dam_breed, culled, modify_date, herd_id, user_id, req.params.cow_id, req.user.id], (err, rows, fields) => {

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

