var express = require('express')
router = express.Router()
const { v4: uuidv4 } = require("uuid")
var database = require('../database')

router.get("/api/herds", (req, res) => {

    if(req.header("user_id") == null){
        return res.status(400).send(JSON.stringify("user_id header is null"))
    }

    database().query("SELECT * FROM herds WHERE user_id = ?", [req.header("user_id")], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }

        var jsonObjects = []

        rows.forEach(function (herd) {
            var herdObject = {
                id: herd.id,
                herd_id: database.decrypt(herd.herd_id),
                location: database.decrypt(herd.location),
                milking_system: database.decrypt(herd.milking_system),
                pin: database.decrypt(herd.pin),
                modify_date: herd.modify_date,
                sync_flag: database.decrypt(herd.sync_flag),
                deleted_flag: database.decrypt(herd.deleted_flag),
                user_id: herd.user_id
            }

            jsonObjects.push(herdObject)

        })

        return res.status(200).send(JSON.stringify(jsonObjects))

    })

})

router.get("/api/herds/:herd_id", (req, res) => {

    if(req.header("user_id") == null){
        return res.status(400).send(JSON.stringify("user_id header is null"))
    }

    database().query("SELECT * FROM herds WHERE herd_id = ? AND user_id = ?", [req.params.herd_id, req.header("user_id")], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }

        var jsonObjects = []

        rows.forEach(function (herd) {
            var herdObject = {
                id: herd.id,
                herd_id: herd.herd_id,
                location: database.decrypt(herd.location),
                milking_system: database.decrypt(herd.milking_system),
                pin: database.decrypt(herd.pin),
                modify_date: herd.modify_date,
                sync_flag: database.decrypt(herd.sync_flag),
                deleted_flag: database.decrypt(herd.deleted_flag),
                user_id: herd.user_id
            }

            jsonObjects.push(herdObject)

        })

        return res.status(200).send(JSON.stringify(jsonObjects))

    })

})

router.get("/api/herds/:herd_id/cows", (req, res) => {

    if(req.header("user_id") == null){
        return res.status(400).send(JSON.stringify("user_id header is null"))
    }

    database().query("SELECT * FROM cows WHERE herd_id = ? AND user_id = ?", [req.params.herd_id, req.header("user_id")], (err, rows, fields) => {

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

router.post("/api/herds", (req, res) => {

    if(req.header("user_id") == null){
        return res.status(400).send(JSON.stringify(err))
    }

    var query = "INSERT INTO herds (id, herd_id, location, milkingSystem, pin, modify_date, sync_flag, deleted_flag, user_id) VALUES ?"

    var values = [[]]

    req.body.herds.forEach(function (herd) {
        var herdValues = []
        herdValues.push(uuidv4())
        herdValues.push(herd.herd_id)
        herdValues.push(database.encrypt(herd.location))
        herdValues.push(database.encrypt(herd.milking_system))
        herdValues.push(database.encrypt(herd.pin))
        herdValues.push(herd.modify_date)
        herdValues.push(database.encrypt(herd.sync_flag))
        herdValues.push(database.encrypt(herd.deleted_flag))
        herdValues.push(req.header("user_id"))

        values.push(herdValues)
    });

    database().query(query, values, (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }

        return res.status(200).send(JSON.stringify("Success"))

    })

})

router.post("/api/herds/:herd_id/cows", (req, res) => {

    if(req.header("user_id") == null){
        return res.status(400).send(JSON.stringify("user_id header is null"))
    }

    var query = "INSERT INTO cows (id, cow_id, days_in_milk, dry_off_day, mastitis_history, method_of_dry_off, daily_milk_average, parity, reproduction_status, number_of_times_bred, farm_breeding_index, lactation_number, days_carried_calf_if_pregnant, projected_due_date, "
        + "current_305_day_milk, current_somatic_cell_count, linear_score_at_last_test, date_of_last_clinical_mastitis, chain_visible_id, animal_registration_no_nlid, dam_breed, culled, modify_date, sync_flag, deleted_flag, herd_id, user_id VALUES ?"

    var values = [[]]

    req.body.cows.forEach(function (cow) {
        var cowValues = []
        cowValues.push(uuidv4())
        cowValues.push(cow.cow_id)
        cowValues.push(database.encrypt(cow.days_in_milk))
        cowValues.push(database.encrypt(cow.dry_off_day))
        cowValues.push(database.encrypt(cow.mastitis_history))
        cowValues.push(database.encrypt(cow.method_of_dry_off))
        cowValues.push(database.encrypt(cow.daily_milk_average))
        cowValues.push(database.encrypt(cow.parity))
        cowValues.push(database.encrypt(cow.reproduction_status))
        cowValues.push(database.encrypt(cow.number_of_times_bred))
        cowValues.push(database.encrypt(cow.farm_breeding_index))
        cowValues.push(database.encrypt(cow.lactation_number))
        cowValues.push(database.encrypt(cow.days_carried_calf_if_pregnant))
        cowValues.push(database.encrypt(cow.projected_due_date))
        cowValues.push(database.encrypt(cow.current_305_day_milk))
        cowValues.push(database.encrypt(cow.current_somatic_cell_count))
        cowValues.push(database.encrypt(cow.linear_score_at_last_test))
        cowValues.push(database.encrypt(cow.date_of_last_clinical_mastitis))
        cowValues.push(database.encrypt(cow.chain_visible_id))
        cowValues.push(database.encrypt(cow.animal_registration_no_nlid))
        cowValues.push(database.encrypt(cow.dam_breed))
        cowValues.push(database.encrypt(cow.culled))
        cowValues.push(cow.modify_date)
        cowValues.push(database.encrypt(cow.sync_flag))
        cowValues.push(database.encrypt(cow.deleted_flag))
        cowValues.push(req.params.herd_id)
        cowValues.push(req.header("user_id"))

        values.push(cowValues)
    });


    database().query(query, values, (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }

        return res.status(200).send(JSON.stringify("Success"))

    })

})

router.put("/api/herds/:herd_id", (req, res) => {

    if(req.header("user_id") == null){
        return res.status(400).send(JSON.stringify("user_id header is null"))
    }

    var id = req.body.id
    var herd_id = req.body.herd_id
    var location = database.encrypt(req.body.location)
    var milkingSystem = database.encrypt(req.body.milkingSystem)
    var pin = database.encrypt(req.body.pin)
    var modify_date = req.body.modify_date
    var sync_flag = database.encrypt(req.body.sync_flag)
    var deleted_flag = database.encrypt(req.body.deleted_flag)
    var user_id = req.header("user_id")

    database().query("UPDATE herds SET id = ?, herd_id = ?, location = ?, milkingSystem = ?, pin = ?, modify_date = ?, sync_flag = ?, deleted_flag= ?, user_id = ? WHERE herd_id = ? AND user_id = ?",
        [id, herd_id, location, milkingSystem, pin, modify_date, sync_flag, deleted_flag, user_id, req.params.herd_id, req.header("user_id")], (err, rows, fields) => {

            if (err != null) {
                return res.status(500).send(JSON.stringify(err))
            }

            return res.status(200).send(JSON.stringify("Success"))

        })

})

router.delete("/api/herds/:herd_id", (req, res) => {

    if(req.header("user_id") == null){
        return res.status(400).send(JSON.stringify("user_id header is null"))
    }
    
    database().query("DELETE FROM herds WHERE herd_id = ? AND user_id = ?", [req.params.herd_id, req.header("user_id")], (err, rows, fields) => {

        if (err != null) {
            return res.status(500).send(JSON.stringify(err))
        }

        return res.status(200).send(JSON.stringify("Success"))

    })

})

module.exports = router;