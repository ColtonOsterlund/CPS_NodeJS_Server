const escape = require('sql-template-strings');
const db = require('./connection');

module.exports = {
  readCalciulateTests: async (cowId, userId) => {
    try {
      const results = await db.query(escape`
        SELECT
          BIN_TO_UUID(id) AS id,
          calciulate_test_id AS calciulateTestId,
          units,
          millivolts,
          result,
          milk_fever AS milkFever,
          follow_up_num AS followUpNum,
          days_in_milk AS daysInMilk,
          dry_off_day AS dryOffDay,
          mastitis_history AS mastitisHistory,
          method_of_dry_off AS methodOfDryOff,
          daily_milk_average AS dailyMilkAverage,
          parity,
          reproduction_status AS reproductionStatus,
          number_of_times_bred AS numberOfTimesBred,
          farm_breeding_index AS farmBreedingIndex,
          lactation_number AS lactationNumber,
          days_carried_calf_if_pregnant AS daysCarriedCalfIfPregnant,
          projected_due_date AS projectedDueDate,
          current_305_day_milk AS current305DayMilk,
          current_somatic_cell_count AS currentSomaticCellCount,
          linear_score_at_last_test AS linearScoreAtLastTest,
          date_of_last_clinical_mastitis AS dateOfLastClinicalMastitis,
          chain_visible_id AS chainVisibleId,
          animal_registration_no_nlid AS animalRegistrationNoNlid,
          dam_breed AS damBreed,
          culled,
          BIN_TO_UUID(cow_id) AS cowId
        FROM calciulate_tests
        WHERE cow_id = UUID_TO_BIN(${cowId})
        AND user_id = UUID_TO_BIN(${userId})
      `);

      return results;
    } catch (error) {
      // TODO: Error handling
      return [];
    }
  },
  readCalciulateTestById: async (id, userId) => {
    try {
      const results = await db.query(escape`
        SELECT
          BIN_TO_UUID(id) AS id,
          calciulate_test_id AS calciulateTestId,
          units,
          millivolts,
          result,
          milk_fever AS milkFever,
          follow_up_num AS followUpNum,
          days_in_milk AS daysInMilk,
          dry_off_day AS dryOffDay,
          mastitis_history AS mastitisHistory,
          method_of_dry_off AS methodOfDryOff,
          daily_milk_average AS dailyMilkAverage,
          parity,
          reproduction_status AS reproductionStatus,
          number_of_times_bred AS numberOfTimesBred,
          farm_breeding_index AS farmBreedingIndex,
          lactation_number AS lactationNumber,
          days_carried_calf_if_pregnant AS daysCarriedCalfIfPregnant,
          projected_due_date AS projectedDueDate,
          current_305_day_milk AS current305DayMilk,
          current_somatic_cell_count AS currentSomaticCellCount,
          linear_score_at_last_test AS linearScoreAtLastTest,
          date_of_last_clinical_mastitis AS dateOfLastClinicalMastitis,
          chain_visible_id AS chainVisibleId,
          animal_registration_no_nlid AS animalRegistrationNoNlid,
          dam_breed AS damBreed,
          culled,
          BIN_TO_UUID(cow_id) AS cowId
        FROM calciulate_tests
        WHERE id = UUID_TO_BIN(${id})
        AND user_id = UUID_TO_BIN(${userId})
      `);

      return results[0] ?? {};
    } catch (error) {
      return {};
    }
  },
  createCalciulateTest: async (calciulateTest, cowId, userId) => {
    try {
      const result = await db.query(escape`
        INSERT
        INTO calciulate_tests (
          calciulate_test_id,
          units,
          millivolts,
          result,
          milk_fever,
          follow_up_num,
          days_in_milk,
          dry_off_day,
          mastitis_history,
          method_of_dry_off,
          daily_milk_average,
          parity,
          reproduction_status,
          number_of_times_bred,
          farm_breeding_index,
          lactation_number,
          days_carried_calf_if_pregnant,
          projected_due_date,
          current_305_day_milk,
          current_somatic_cell_count,
          linear_score_at_last_test,
          date_of_last_clinical_mastitis ,
          chain_visible_id,
          animal_registration_no_nlid,
          dam_breed,
          cow_id,
          user_id
        )
        VALUES (
          ${calciulateTest.calciulateTestId},
          ${calciulateTest.testType},
          ${calciulateTest.units},
          ${calciulateTest.millivolts},
          ${calciulateTest.result},
          ${calciulateTest.milkFever},
          ${calciulateTest.followUpNum},
          ${calciulateTest.daysInMilk},
          ${calciulateTest.dryOffDay},
          ${calciulateTest.mastitisHistory},
          ${calciulateTest.methodOfDryOff},
          ${calciulateTest.dailyMilkAverage},
          ${calciulateTest.parity},
          ${calciulateTest.reproductionStatus},
          ${calciulateTest.numberOfTimesBred},
          ${calciulateTest.farmBreedingIndex},
          ${calciulateTest.lactationNumber},
          ${calciulateTest.daysCarriedCalfIfPregnant},
          ${calciulateTest.projectedDueDate},
          ${calciulateTest.current305DayMilk},
          ${calciulateTest.currentSomaticCellCount},
          ${calciulateTest.linearScoreAtLastTest},
          ${calciulateTest.dateOfLastClinicalMastitis},
          ${calciulateTest.chainVisibleId},
          ${calciulateTest.animalRegistrationNoNlid},
          ${calciulateTest.damBreed},
          ${calciulateTest.culled},
          UUID_TO_BIN(${cowId}),
          UUID_TO_BIN(${userId})
        )
      `);

      return result;
    } catch (error) {
      // TODO: Error handling
      return;
    }
  },
  updateCalciulateTest: async (calciulateTest, id, userId) => {
    try {
      const result = await db.query(escape`
        UPDATE calciulate_tests
        SET
          calciulate_test_id = ${calciulateTest.calciulateTestId},
          units = ${calciulateTest.units},
          millivolts = ${calciulateTest.millivolts},
          result = ${calciulateTest.result},
          milk_fever = ${calciulateTest.milkFever},
          follow_up_num = ${calciulateTest.followUpNum}
          days_in_milk = ${calciulateTest.daysInMilk},
          dry_off_day = ${calciulateTest.dryOffDay},
          mastitis_history = ${calciulateTest.mastitisHistory},
          method_of_dry_off = ${calciulateTest.methodOfDryOff},
          daily_milk_average = ${calciulateTest.dailyMilkAverage},
          parity = ${calciulateTest.parity},
          reproduction_status = ${calciulateTest.reproductionStatus},
          number_of_times_bred = ${calciulateTest.numberOfTimesBred},
          farm_breeding_index = ${calciulateTest.farmBreedingIndex},
          lactation_number = ${calciulateTest.lactationNumber},
          days_carried_calf_if_pregnant = ${calciulateTest.daysCarriedCalfIfPregnant},
          projected_due_date = ${calciulateTest.projectedDueDate},
          current_305_day_milk = ${calciulateTest.current305DayMilk},
          current_somatic_cell_count = ${calciulateTest.currentSomaticCellCount},
          linear_score_at_last_test = ${calciulateTest.linearScoreAtLastTest},
          date_of_last_clinical_mastitis = ${calciulateTest.dateOfLastClinicalMastitis},
          chain_visible_id = ${calciulateTest.chainVisibleId},
          animal_registration_no_nlid = ${calciulateTest.animalRegistrationNoNlid},
          dam_breed = ${calciulateTest.damBreed},
          culled = ${calciulateTest.culled},
        WHERE id = UUID_TO_BIN(${id})
        AND user_id = UUID_TO_BIN(${userId})
      `);
      return result;
    } catch (error) {
      // TODO: Error handling
      return;
    }
  },
  deleteCalciulateTest: async (id, userId) => {
    try {
      const result = await db.query(escape`
        DELETE FROM calciulate_tests
        WHERE id = UUID_TO_BIN(${id})
        AND user_id = UUID_TO_BIN(${userId})
      `);
      return result;
    } catch (error) {
      // TODO: Error handling
      return;
    }
  },
};
