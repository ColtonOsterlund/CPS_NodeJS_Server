const express = require('express');
const {
  readCalciulateTestById,
  updateCalciulateTest,
  deleteCalciulateTest,
} = require('../../database/calciulate_tests');
const { authenticateToken } = require('../../middleware/authentication');
const { mySqlDateTimeNow } = require('../../utils/date_time');

const router = express.Router();

router.get('/:calciulateTestId', authenticateToken, async (req, res) => {
  const calciulateTest = await readCalciulateTestById(
    req.params.calciulateTestId,
    req.user.id
  );
  res.status(200).json(JSON.stringify(calciulateTest));
});

router.put('/:calciulateTestId', authenticateToken, async (req, res) => {
  if (
    !req.body?.calciulateTestId ||
    !req.body?.units ||
    !req.body?.millivolts ||
    !req.body?.result ||
    !req.body?.milkFever ||
    !req.body?.followUpNum ||
    !req.body?.daysInMilk ||
    !req.body?.dryOffDay ||
    !req.body?.mastitisHistory ||
    !req.body?.methodOfDryOff ||
    !req.body?.dailyMilkAverage ||
    !req.body?.parity ||
    !req.body?.reproductionStatus ||
    !req.body?.numberOfTimesBred ||
    !req.body?.farmBreedingIndex ||
    !req.body?.lactationNumber ||
    !req.body?.daysCarriedCalfIfPregnant ||
    !req.body?.projectedDueDate ||
    !req.body?.current305DayMilk ||
    !req.body?.currentSomaticCellCount ||
    !req.body?.linearScoreAtLastTest ||
    !req.body?.dateOfLastClinicalMastitis ||
    !req.body?.chainVisibleId ||
    !req.body?.animalRegistrationNoNlid ||
    !req.body?.damBreed ||
    !req.body?.culled
  ) {
    return res.status(400).json({ message: 'Missing fields in request body' });
  }

  const calciulateTest = {
    calciulateTestId: req.body.calciulateTestId,
    units: req.body.units,
    millivolts: req.body.millivolts,
    result: req.body.result,
    milkFever: req.body.milkFever,
    followUpNum: req.body.followUpNum,
    daysInMilk: req.body.daysInMilk,
    dryOffDay: req.body.dryOffDay,
    mastitisHistory: req.body.mastitisHistory,
    methodOfDryOff: req.body.methodOfDryOff,
    dailyMilkAverage: req.body.dailyMilkAverage,
    parity: req.body.parity,
    reproductionStatus: req.body.reproductionStatus,
    numberOfTimesBred: req.body.numberOfTimesBred,
    farmBreedingIndex: req.body.farmBreedingIndex,
    lactationNumber: req.body.lactationNumber,
    daysCarriedCalfIfPregnant: req.body.daysCarriedCalfIfPregnant,
    projectedDueDate: req.body.projectedDueDate,
    current305DayMilk: req.body.current305DayMilk,
    currentSomaticCellCount: req.body.currentSomaticCellCount,
    linearScoreAtLastTest: req.body.linearScoreAtLastTest,
    dateOfLastClinicalMastitis: req.body.dateOfLastClinicalMastitis,
    chainVisibleId: req.body.chainVisibleId,
    animalRegistrationNoNlid: req.body.animalRegistrationNoNlid,
    damBreed: req.body.damBreed,
    culled: req.body.culled,
    modifyDate: mySqlDateTimeNow(),
  };

  // TODO: Check if there was an error in updating
  const result = await updateCalciulateTest(
    calciulateTest,
    req.params.calciulateTestId,
    req.user.id
  );

  res.status(201).json({ message: 'Successfully updated calciulate test' });
});

router.delete('/:calciulateTestId', authenticateToken, async (req, res) => {
  // TODO: Check if there was an error in deleting
  const result = await deleteCalciulateTest(
    req.params.calciulateTestId,
    req.user.id
  );
  res.status(201).json({ message: 'Successfully deleted calciulate test' });
});

module.exports = router;
