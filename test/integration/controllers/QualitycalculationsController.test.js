let supertest = require('supertest');
let sinon = require('sinon');
let mock = require('sails-mock-models');
let assert = require('assert');

describe('QualitycalculationsController', () => {

  // Test POST request triggering ripeness calculations
  describe('#ripenesscalculations', () => {

    it('Update quality calculations (items found)', (done) => {
      let qualityItemData = [
        {
           'product_id': 817582156007,
            'url': 'https://us-central1-fulfil-inspection.cloudfunctions.net/banana-ripeness-test-function',
            'id': 4,
            'inventory_id': 58278,
            'harvest_date': '2019-12-03T08:07:42.000Z',
            'season': 'peak',
            'variety': 'apple',
            'supplier_id': 112,
            'condition_date': '2019-12-03T08:07:42.000Z',
            'color': 'yellow',
            'temperature_measurements': '9.1,8.5,9.5,10.2,10.1,9.5',
            'temperature_measurement_times': '2019-11-27 06:59:00,2019-11-26 12:10:00,2019-11-26 11:59:00,2019-11-25 23:59:00,2019-11-25 14:59:00,2019-11-25 12:50:00'
        }
      ];

      // Stub the getAllItemData query function
      sinon.stub(Qualitycalculations, 'getAllItemData').returns(qualityItemData);

      // Mock the POST request
      let data = {'category': 'ripeness'};
      supertest(sails.hooks.http.app)
        .get('/qualitycalculations')
        .send(data)
        .set('Accept', 'application/json')
        .set('key', process.env.API_KEY)
        .set('token', process.env.TOKEN)
        .expect(200)
        .end(function (err, res){
          Qualitycalculations.getAllItemData.restore();
          if (err) return done(err);
          done();
        });
    });

    it('Update quality calculations (no items found)', (done) => {

      let qualityItemData =[{}];

      // Stub the getAllItemData query function
      sinon.stub(Qualitycalculations, 'getAllItemData').returns(qualityItemData);

      // Mock the POST request
      let data = {'category': 'ripeness'};
      supertest(sails.hooks.http.app)
        .get('/qualitycalculations')
        .send(data)
        .set('Accept', 'application/json')
        .set('key', process.env.API_KEY)
        .set('token', process.env.TOKEN)
        .expect(200)
        .expect((err, res) => {
          assert(err);
          })
        .end(done);
    })


  })
});
