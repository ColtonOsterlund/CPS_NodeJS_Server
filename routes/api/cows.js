const express = require('express');
const { readCowById, deleteCow, updateCow } = require('../../database/cows');
const {
  readCalciulateTests,
  createCalciulateTest,
} = require('../../database/calciulate_tests');
const { authenticateToken } = require('../../middleware/authentication');
const { mySqlDateTimeNow } = require('../../utils/date_time');

const router = express.Router();

router.get('/:cowId', authenticateToken, async (req, res) => {
  const cow = await readCowById(req.params.cowId, req.user.id);
  res.status(200).json(JSON.stringify(cow));
});

router.put('/:cowId', authenticateToken, async (req, res) => {
  if (
    req.body?.cowId === undefined ||
    req.body?.daysInMilk === undefined ||
    req.body?.dryOffDay === undefined ||
    req.body?.mastitisHistory === undefined ||
    req.body?.methodOfDryOff === undefined ||
    req.body?.dailyMilkAverage === undefined ||
    req.body?.parity === undefined ||
    req.body?.reproductionStatus === undefined ||
    req.body?.numberOfTimesBred === undefined ||
    req.body?.farmBreedingIndex === undefined ||
    req.body?.lactationNumber === undefined ||
    req.body?.daysCarriedCalfIfPregnant === undefined ||
    req.body?.projectedDueDate === undefined ||
    req.body?.current305DayMilk === undefined ||
    req.body?.currentSomaticCellCount === undefined ||
    req.body?.linearScoreAtLastTest === undefined ||
    req.body?.dateOfLastClinicalMastitis === undefined ||
    req.body?.chainVisibleId === undefined ||
    req.body?.animalRegistrationNoNlid === undefined ||
    req.body?.damBreed === undefined ||
    req.body?.culled === undefined
  ) {
    return res.status(400).json({ message: 'Missing fields in request body' });
  }

  const cow = {
    cowId: req.body.cowId,
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
  const result = await updateCow(cow, req.params.cowId, req.user.id);

  res.status(201).json({ message: 'Successfully updated cow' });
});

router.delete('/:cowId', authenticateToken, async (req, res) => {
  // TODO: Check if there was an error in deleting
  const result = await deleteCow(req.params.cowId, req.user.id);
  res.status(201).json({ message: 'Successfully deleted cow' });
});

router.get('/:cowId/calciulate-tests', authenticateToken, async (req, res) => {
  const calciulateTests = await readCalciulateTests(
    req.params.cowId,
    req.user.id
  );
  res.status(200).json(JSON.stringify(calciulateTests));
});

router.post('/:cowId/calciulate-tests', authenticateToken, async (req, res) => {

console.log(req.body)



  if (
    req.body?.calciulateTestId === undefined ||
    req.body?.units === undefined ||
    req.body?.millivolts === undefined ||
    req.body?.result === undefined ||
    req.body?.milkFever === undefined ||
    req.body?.followUpNum === undefined ||
    req.body?.daysInMilk === undefined ||
    req.body?.dryOffDay === undefined ||
    req.body?.mastitisHistory === undefined ||
    req.body?.methodOfDryOff === undefined ||
    req.body?.dailyMilkAverage === undefined ||
    req.body?.parity === undefined ||
    req.body?.reproductionStatus === undefined ||
    req.body?.numberOfTimesBred === undefined ||
    req.body?.farmBreedingIndex === undefined ||
    req.body?.lactationNumber === undefined ||
    req.body?.daysCarriedCalfIfPregnant === undefined ||
    req.body?.projectedDueDate === undefined ||
    req.body?.current305DayMilk === undefined ||
    req.body?.currentSomaticCellCount === undefined ||
    req.body?.linearScoreAtLastTest === undefined ||
    req.body?.dateOfLastClinicalMastitis === undefined ||
    req.body?.chainVisibleId === undefined ||
    req.body?.animalRegistrationNoNlid === undefined ||
    req.body?.damBreed === undefined ||
    req.body?.culled === undefined
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
  const result = await createCalciulateTest(
    calciulateTest,
    req.params.cowId,
    req.user.id
  );

  res.status(201).json({ message: 'Successfully created calciulate test' });
});

module.exports = router;
