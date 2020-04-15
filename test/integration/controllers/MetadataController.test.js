let supertest = require('supertest');
let sinon = require('sinon');

describe('MetadataController', function () {
    //Metadata Test Case
    describe('#metadata', () => {
    // Get Cart by userkey Test Case
    it('Metadata', (done) => {

      let data = [{
            createdAt: 1549651234733,
            updatedAt: 1550779336050,
            id: 31,
            product_id: 1991,
            descriptor: "blue monkey coconut water",
            upc: "059654705007",
            department: "",
            aisle: "1",
            height: 238,
            length: 0,
            ength_secondary: "",
            width: 0,
            width_secondary: "",
            diameter: 79,
            diameter_secondary: "",
            diameter_narrow: "",
            mass: 924,
            volume: "",
            bounding_box_volume: "",
            density: 0,
            cog: 0,
            shape: 1,
            material: "glass",
            package_type: "bottle",
            packaging_mods: "",
            transparency: 1,
            damageable: 1,
            damaging: 0,
            has_stem: "False",
            is_sharp: 0,
            storage_temp: "",
            storage_humidity: 0,
            ethylene_sensitivity: 0,
            co2_sensitivity: 0,
            max_inventory: 0,
            storage_config: "{\"rank\":0,\"tray\":7,\"depthDistance\":238,\"horizontalDistance\":87.0,\"verticalDistance\":79,\"numSlot\":4,\"numLane\":2,\"numTray\":14,\"mass\":2098}"
        }
      ];

        sinon.stub(Metadata, 'getMetaData').returns(data);
        supertest(sails.hooks.http.app)
        .get('/metadata/feed')
        .set('Accept', 'application/json')
        .set('key', process.env.API_KEY)
        .set('token', process.env.TOKEN)
        .expect(200)
        .end((err, res) => {
          Metadata.getMetaData.restore();
          if (err) return done(err);
          if (!res || !res.text) {
            return done(new Error('Response not found !!!'));
          }
          if (res.body.length == 0 || res.body[0].product_id == null) {
            return done(new Error('Response mismatched !!!'));
          }
          done();
        });
    });
  });
});
