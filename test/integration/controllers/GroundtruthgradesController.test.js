const GroundTruthGrades = require('../../../api/controllers/GroundtruthgradesController');

describe('Groundtruthgrades', () => {
  // getAllGradesByInv Test Case
  describe('#getAllGradesByInv', async () => {
    it('should return all grades of particular inventory id', (done) => {
      let invId = '57823';
      GroundTruthGrades.getAllGradesByInv(invId).then((result, err) => {
        return done();
      },
      err => {
      });
    });
  });

  // doGradesMeetCriteria Test Case
  describe('#doGradesMeetCriteria', async () => {
    it('should return criteria of grades', (done) => {
      let grades = [ 'PASS', 'FAIL', 'A', 'PASS', 'PASS', 'PASS', 'PASS', 'PASS', 'PASS', 'PASS'];
      GroundTruthGrades.doGradesMeetCriteria(grades).then((result, err) => {
        return done();
      },
      err => {
      });
    });
  });

  // publishMessageToFactory Test Case
  describe('#publishMessageToFactory', async () => {
    it('should publish message to factory if criteria has been pass', (done) => {
      let invId = '11111';
      GroundTruthGrades.publishMessageToFactory(invId).then((result, err) => {
        return done();
      },
      err => {
      });
    });
  });
});
