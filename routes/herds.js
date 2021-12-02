var express = require('express')
router = express.Router()
const { v4: uuidv4 } = require("uuid")
const { database, encrypt, decrypt } = require('../database')
const { authenticateToken } = require('../middleware/authentication')

router.get("/api/herds", authenticateToken, (req, res) => {


    database().query("SELECT * FROM herds WHERE user_id = ?", [req.user.id], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }

        var jsonObjects = []

        rows.forEach(function (herd) {
            var herdObject = {
                id: herd.id,
                herd_id: decrypt(herd.herd_id),
                location: decrypt(herd.location),
                milking_system: decrypt(herd.milking_system),
                pin: decrypt(herd.pin),
                modify_date: herd.modify_date,
                sync_flag: decrypt(herd.sync_flag),
                deleted_flag: decrypt(herd.deleted_flag),
                user_id: herd.user_id
            }

            jsonObjects.push(herdObject)

        })

        return res.status(200).send(JSON.stringify(jsonObjects))

    })

})

router.get("/api/herds/:herd_id", authenticateToken, (req, res) => {

    database().query("SELECT * FROM herds WHERE herd_id = ? AND user_id = ?", [req.params.herd_id, req.user.id], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }

        var jsonObjects = []

        rows.forEach(function (herd) {
            var herdObject = {
                id: herd.id,
                herd_id: herd.herd_id,
                location: decrypt(herd.location),
                milking_system: decrypt(herd.milking_system),
                pin: decrypt(herd.pin),
                modify_date: herd.modify_date,
                sync_flag: decrypt(herd.sync_flag),
                deleted_flag: decrypt(herd.deleted_flag),
                user_id: herd.user_id
            }

            jsonObjects.push(herdObject)

        })

        return res.status(200).send(JSON.stringify(jsonObjects))

    })

})

router.get("/api/herds/:herd_id/cows", authenticateToken, (req, res) => {

    database().query("SELECT * FROM cows WHERE herd_id = ? AND user_id = ?", [req.params.herd_id, req.user.id], (err, rows, fields) => {

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
                culled: decrypt(cow.culled),
                modify_date: cow.modify_date,
                sync_flag: decrypt(cow.sync_flag),
                deleted_flag: decrypt(cow.deleted_flag),
                herd_id: cow.herd_id,
                user_id: cow.user_id
            }

            jsonObjects.push(cowObject)

        })

        return res.status(200).send(JSON.stringify(jsonObjects))

    })

})

router.post("/api/herds", authenticateToken, (req, res) => {

    var query = "INSERT INTO herds (id, herd_id, location, milkingSystem, pin, modify_date, sync_flag, deleted_flag, user_id) VALUES ?"

    var values = []

    req.body.herds.forEach(function (herd) {
        var herdValues = []
        herdValues.push(uuidv4())
        herdValues.push(herd.herd_id)
        herdValues.push(encrypt(herd.location))
        herdValues.push(encrypt(herd.milking_system))
        herdValues.push(encrypt(herd.pin))
        herdValues.push(herd.modify_date)
        herdValues.push(encrypt(herd.sync_flag))
        herdValues.push(encrypt(herd.deleted_flag))
        herdValues.push(req.user.id)

        values.push(herdValues)
    });

    database().query(query, [values], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }

        return res.status(200).send(JSON.stringify("Success"))

    })

})

router.post("/api/herds/:herd_id/cows", authenticateToken, (req, res) => {


    var query = "INSERT INTO cows (id, cow_id, days_in_milk, dry_off_day, mastitis_history, method_of_dry_off, daily_milk_average, parity, reproduction_status, number_of_times_bred, farm_breeding_index, lactation_number, days_carried_calf_if_pregnant, projected_due_date, "
        + "current_305_day_milk, current_somatic_cell_count, linear_score_at_last_test, date_of_last_clinical_mastitis, chain_visible_id, animal_registration_no_nlid, dam_breed, culled, modify_date, sync_flag, deleted_flag, herd_id, user_id VALUES ?"

    var values = []

    req.body.cows.forEach(function (cow) {
        var cowValues = []
        cowValues.push(uuidv4())
        cowValues.push(cow.cow_id)
        cowValues.push(encrypt(cow.days_in_milk))
        cowValues.push(encrypt(cow.dry_off_day))
        cowValues.push(encrypt(cow.mastitis_history))
        cowValues.push(encrypt(cow.method_of_dry_off))
        cowValues.push(encrypt(cow.daily_milk_average))
        cowValues.push(encrypt(cow.parity))
        cowValues.push(encrypt(cow.reproduction_status))
        cowValues.push(encrypt(cow.number_of_times_bred))
        cowValues.push(encrypt(cow.farm_breeding_index))
        cowValues.push(encrypt(cow.lactation_number))
        cowValues.push(encrypt(cow.days_carried_calf_if_pregnant))
        cowValues.push(encrypt(cow.projected_due_date))
        cowValues.push(encrypt(cow.current_305_day_milk))
        cowValues.push(encrypt(cow.current_somatic_cell_count))
        cowValues.push(encrypt(cow.linear_score_at_last_test))
        cowValues.push(encrypt(cow.date_of_last_clinical_mastitis))
        cowValues.push(encrypt(cow.chain_visible_id))
        cowValues.push(encrypt(cow.animal_registration_no_nlid))
        cowValues.push(encrypt(cow.dam_breed))
        cowValues.push(encrypt(cow.culled))
        cowValues.push(cow.modify_date)
        cowValues.push(encrypt(cow.sync_flag))
        cowValues.push(encrypt(cow.deleted_flag))
        cowValues.push(req.params.herd_id)
        cowValues.push(req.user.id)

        values.push(cowValues)
    });


    database().query(query, [values], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }

        return res.status(200).send(JSON.stringify("Success"))

    })

})

router.put("/api/herds/:herd_id", authenticateToken, (req, res) => {


    var id = req.body.id
    var herd_id = req.body.herd_id
    var location = encrypt(req.body.location)
    var milkingSystem = encrypt(req.body.milkingSystem)
    var pin = encrypt(req.body.pin)
    var modify_date = req.body.modify_date
    var sync_flag = encrypt(req.body.sync_flag)
    var deleted_flag = encrypt(req.body.deleted_flag)
    var user_id = req.user.id

    database().query("UPDATE herds SET id = ?, herd_id = ?, location = ?, milkingSystem = ?, pin = ?, modify_date = ?, sync_flag = ?, deleted_flag= ?, user_id = ? WHERE herd_id = ? AND user_id = ?",
        [id, herd_id, location, milkingSystem, pin, modify_date, sync_flag, deleted_flag, user_id, req.params.herd_id, req.user.id], (err, rows, fields) => {

            if (err != null) {
                return res.status(500).send(JSON.stringify(err))
            }

            return res.status(200).send(JSON.stringify("Success"))

        })

})

router.delete("/api/herds/:herd_id", authenticateToken, (req, res) => {

    database().query("DELETE FROM herds WHERE herd_id = ? AND user_id = ?", [req.params.herd_id, req.user.id], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }

        return res.status(200).send(JSON.stringify("Success"))

    })

})

module.exports = router;