let sinon = require('sinon');
let mock = require('sails-mock-models');
let supertest = require('supertest');
let staticMethod = require('../../../api/controllers/InventoryController.js');

describe('InventoryController', () => {
    //Inventory addItem test case
    describe('#addItem', () => {

        let data = {
          upc: "00000",
          location_id: "0",
          product_id: "1",
          is_graded_item: "false",
          factory_inventory_id: 123,
          sku: "1",
          price: "1.83",
          sale_price: "0",
          long_description: "testing long desc",
          short_description: "testing short desc",
          category_id: "8",
          brand: "Barilla",
          thumb: "assets/img/thumbs/1995.jpg",
          image: "assets/img/product/1995.jpg",
          grade_id: "0",
          is_reserved: "1",
          note: "null",
          price_override: "0",
          weight_override: "0",
        };

        let product = [
          {
            createdAt: 1549651234555,
            updatedAt: 1550772140693,
            id: 1,
            name: "Blue Monkey Coconut Water",
            variant_id: null,
            sku: 0,
            upc: "00000",
            price: 0,
            sale_price: 0,
            long_description: "",
            short_description: "",
            category_id: 0,
            brand: "",
            thumb: "https://storage.googleapis.com/fulfil-web.appspot.com/thumbs/1.jpg",
            image: "https://storage.googleapis.com/fulfil-web.appspot.com/product/1.jpg",
            label: null,
            alt_img_1: "",
            alt_img_2: "",
            alt_img_3: "",
            is_selectable_meat: false,
            is_selectable_produce: false,
            nominal_size: "",
            unit_type: ""
          }
        ];

        let inventory = {
          createdAt: 1553743968642,
          updatedAt: 1553743968642,
          id: 1,
          location_id: 0,
          is_graded_item: false,
          product_id: 1,
          is_reserved: 0,
          reservation_expires: null,
          reservation_cart_id: null,
          grade_id: 0,
          note: null,
          price_override: 0,
          weight_override: 0,
          image_override: "",
          scan_data: "",
          factory_inventory_id: 1
        };

        it('Inventory Add Item (product exists)', (done) => {

          mock.mockModel(Product, 'find', product);

          sinon.stub(Inventory, 'create').returns({
            fetch: sinon.stub().returns(inventory)
          });

          supertest(sails.hooks.http.app)
            .post('/inventory/addItem')
            .send(data)
            .set('Accept', 'application/json')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .expect(200)
            .end(function (err, res) {

              Product.find.restore();
              Inventory.create.restore();

              if (err) return done(err);

              if (res.body.id !== 1 && res.body.product_id !== 1) {
                return done(new Error('Response mismatched !!!'));
              }

              done();
            });
        });

        it('Inventory Add Item (product not exists)', (done) => {

          mock.mockModel(Product, 'find', []);

          sinon.stub(Product, 'create').returns({
            fetch: sinon.stub().returns(product[0])
          });

          sinon.stub(Inventory, 'create').returns({
            fetch: sinon.stub().returns(inventory)
          });

          supertest(sails.hooks.http.app)
            .post('/inventory/addItem')
            .send(data)
            .set('Accept', 'application/json')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .expect(200)
            .end(function (err, res) {

              Product.find.restore();
              Product.create.restore();
              Inventory.create.restore();

              if (err) return done(err);

              if (res.body.id !== 1 && res.body.product_id !== 1) {
                return done(new Error('Response mismatched !!!'));
              }

              done();
            });
        });

        it('Inventory Add Item (without passing params)', (done) => {
          supertest(sails.hooks.http.app)
            .post('/inventory/addItem')
            .set('Accept', 'application/json')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .expect(500, done);
        });
    });

    //Attempt Reserve Endpoint Test Case
    describe('#attemptReserveEndpoint', function () {

        it('Attempt Reserve Endpoint', function (done) {

          let inventory = [
            {
              createdAt: 1553743968642,
              updatedAt: 1553743968642,
              id: 1,
              location_id: 0,
              is_graded_item: false,
              product_id: 1,
              is_reserved: 0,
              reservation_expires: null,
              reservation_cart_id: null,
              grade_id: 0,
              note: null,
              price_override: 0,
              weight_override: 0,
              image_override: "",
              scan_data: ""
            }
          ];

          mock.mockModel(Inventory, 'find', inventory);
          sinon.stub(Inventory, 'reserveInventory').returns(1);

          supertest(sails.hooks.http.app)
              .get('/inventory/attemptReserve?product_id=1')
              .set('Accept', 'application/json')
              .set('key', process.env.API_KEY)
              .set('token', process.env.TOKEN)
              .expect(200)
              .end(function (err, res) {

                Inventory.find.restore();
                Inventory.reserveInventory.restore();

                if (err) return done(err);

                if (!res || !res.text) {
                    return done(new Error('Response not found !!!'));
                }

                if (res.body.is_reserved !== true) {
                  return done(new Error('Response mismatched !!!'));
                }

                done();

              });
        });

        it('Attempt Reserve Endpoint (without passing params)', function (done) {
          supertest(sails.hooks.http.app)
            .get('/inventory/attemptReserve')
            .set('Accept', 'application/json')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .expect(500, done);
        });
    });

    //Release Reservation By Cart Id Test Case
    describe('#releaseReservationByCartId', function () {

      it('Release Reservation By Cart Id', function (done) {

        sinon.stub(Inventory, 'releaseReservationByCart').returns(1);

        supertest(sails.hooks.http.app)
          .get('/inventory/releaseReservationByCartId?cart_id=1')
          .set('Accept', 'application/json')
          .set('key', process.env.API_KEY)
          .set('token', process.env.TOKEN)
          .expect(200)
          .end(function (err, res) {
            Inventory.releaseReservationByCart.restore();
            if (err) return done(err);
            if (!res || !res.text) {
              return done(new Error('Response not found !!!'));
            }
            done();
          });

      });

      it('Release Reservation By Cart Id (without passing params)', function (done) {
        supertest(sails.hooks.http.app)
          .get('/inventory/releaseReservationByCartId')
          .set('Accept', 'application/json')
          .set('key', process.env.API_KEY)
          .set('token', process.env.TOKEN)
          .expect(500, done);
      });
    });

    //Release Reservation By Inventory Id Test Case
    describe('#releaseReservationByInventoryId', function () {

        it('Release Reservation By Inventory Id', function (done) {

            sinon.stub(Inventory, 'releaseReservationByInventory').returns(1);

            supertest(sails.hooks.http.app)
                .get('/inventory/releaseReservationByInventoryId?inventory_id=1')
                .set('Accept', 'application/json')
                .set('key', process.env.API_KEY)
                .set('token', process.env.TOKEN)
                .expect(200)
                .end(function (err, res) {
                    Inventory.releaseReservationByInventory.restore();
                    if (err) return done(err);
                    if (!res || !res.text) {
                        return done(new Error('Response not found !!!'));
                    }
                    done();
                });
        });

        it('Release Reservation By Inventory Id (without passing params)', function (done) {
          supertest(sails.hooks.http.app)
            .get('/inventory/releaseReservationByInventoryId')
            .set('Accept', 'application/json')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .expect(500, done);
        });
    });

    // //Get Available Items Test Case
    // describe('#getAvailableItems', function () {
    //     it('Get Available Items', function (done) {
    //         supertest(sails.hooks.http.app)
    //             .get('/inventory/getAll')
    //             .set('Accept', 'application/json')
    //             .expect(200)
    //             .end(function (err, res) {
    //                 if (err) return done(err);
    //                 if (!res || !res.text) {
    //                     return done(new Error('Response not found !!!'));
    //                 }
    //                 done();
    //             });
    //     });
    // });
});
