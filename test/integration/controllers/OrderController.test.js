let mock = require('sails-mock-models');
let sinon = require('sinon');
let supertest = require('supertest');
let staticMethod = require('../../../api/controllers/OrderController.js');
let Pubsub = require('@google-cloud/pubsub');

describe('OrderController', function () {

    // create order test case
    describe('#createOrder', () => {
        it('Create new Order', (done) => {
          let data = {
                user_id: process.env.USER_ID,
                cart_id: '1',
                card_number: '4111474741114747',
                expiration: '11/2019',
                csv: '333',
                billing_name: 'John Smith',
                billing_address: '3501 Edison Way',
                billing_city: 'Menlo Park',
                billing_zipcode: '94025',
                billing_country: 'USA',
                delivery_address: '3501 Edison Way',
                delivery_city: 'Menlo Park',
                delivery_zipcode: '94025',
                delivery_time: '11:30',
                delivery_apt: 'Apartment',
                delivery_state: 'CA',
                delivery_name: 'John Smith',
                billing_apartment: 'Apartment',
                delivery_country: 'USA',
                billing_state: 'CA',
                delivery_method: 'pickup',
                delivery_quoteId: '354545454'
            };

            let orderData = {
              id: 1,
              cart_id: 1,
              order_total: 0,
              name: "Oroweat Whole Grain Bread",
              product_id: 1,
              price: 2,
              sale_price: 1.8,
              order_date: 1555608420078
            };

            sinon.stub(Order, 'create').returns({
              fetch : sinon.stub().returns(orderData)
            });

            let invData = [
              {
                product_id : 1,
                quantity: 1,
                price: 1,
                sale_price: 0.9
              },
              {
                product_id : 2,
                quantity: 1,
                price: 1,
                sale_price: 0.9
              }
            ];

            sinon.stub(Inventory, 'getReserveInventoryByCart').returns(invData);

            sinon.stub(Cart, 'update').returns({
              set : sinon.stub().returns(true)
            });

            sinon.stub(Inventory, 'update').returns({
              set : sinon.stub().returns(true)
            });

            mock.mockModel(Order, 'find', [orderData]);

            let inventory = [
              {
                createdAt: 1553743968642,
                updatedAt: 1555608415160,
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
              },
              {
                createdAt: 1553743968642,
                updatedAt: 1555608415160,
                id: 2,
                location_id: 0,
                is_graded_item: false,
                product_id: 2,
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

            sinon.stub(Order, 'packOrderbyId').returns(inventory);

            supertest(sails.hooks.http.app)
                .post('/order/createOrder')
                .send(data)
                .set('Accept', 'application/json')
                .set('key', process.env.API_KEY)
                .set('token', process.env.TOKEN)
                .expect(200)
                .end((err, res) => {

                    Order.create.restore();
                    Inventory.getReserveInventoryByCart.restore();
                    Cart.update.restore();
                    Inventory.update.restore();
                    Order.find.restore();
                    Order.packOrderbyId.restore();

                    if (err) return done(err);

                    if (!res || !res.text) {
                        return done(new Error('Response not found !!!'));
                    }

                    if (res.body.body.order_id !== 1) {
                      return done(new Error('Response mismatched !!!'));
                    }

                    done();
                });
        });

        it('Create Order (without passing params)', (done) => {

          supertest(sails.hooks.http.app)
            .post('/order/createOrder')
            .set('Accept', 'application/json')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .expect(500, done);

        });
    });

    //Get Orders By UserToken
    // OUR IMPLEMENTATION START
    describe('#getOrdersByUserToken', () => {
    // Get Cart by userkey Test Case
    it('Get Order by userToken', (done) => {

      let data = [
        {
          order_id: 1,
          cart_id: 1,
          order_total: 0,
          name: "product 1",
          product_id: 1,
          price: 4.98,
          sale_price: 2.49,
          long_description: "",
          short_description: "",
          brand: "Oroweat",
          image: "https://storage.googleapis.com/fulfil-web.appspot.com/product/2159.jpg",
          label: "50% off!",
          nominal_size: "680",
          unit_type: "g",
          order_date: 1555608420078
        },
        {
          order_id: 2,
          cart_id: 2,
          order_total: 0,
          name: "product 2",
          product_id: 2,
          price: 4.98,
          sale_price: 2.49,
          long_description: "",
          short_description: "",
          brand: "Oroweat",
          image: "https://storage.googleapis.com/fulfil-web.appspot.com/product/2.jpg",
          label: "50% off!",
          nominal_size: "680",
          unit_type: "g",
          order_date: 1555608420080
        }
      ];

      sinon.stub(Order, 'getOrdersByUser').returns(data);

      supertest(sails.hooks.http.app)
        .get(`/order?user_token=${process.env.USER_ID}`)
        .set('Accept', 'application/json')
        .set('key', process.env.API_KEY)
        .set('token', process.env.TOKEN)
        .expect(200)
        .end((err, res) => {
          Order.getOrdersByUser.restore();
          if (err) return done(err);
          if (!res || !res.text) {
            return done(new Error('Response not found !!!'));
          }

          if (res.body.length !== 2 || res.body[0].product_id !== 1) {
            return done(new Error('Response mismatched !!!'));
          }
          done();
        });
    });
});
    // OUR IMPLEMENTATION END

    //getPackedOrder
    describe('#packOrderEndpoint', function () {
      it('Pack Order End Point', function (done) {
        let data = {
          orderId : 1,
          userId : 1,
          cartId : 1
        };

        let orderData = {
          id: 1,
          cart_id: 1,
          order_total: 0,
          name: "Oroweat Whole Grain Bread",
          product_id: 1,
          price: 2,
          sale_price: 1.8,
          order_date: 1555608420078
        };

        mock.mockModel(Order, 'find', [orderData]);

        let inventory = [
          {
            createdAt: 1553743968642,
            updatedAt: 1555608415160,
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
          },
          {
            createdAt: 1553743968642,
            updatedAt: 1555608415160,
            id: 2,
            location_id: 0,
            is_graded_item: false,
            product_id: 2,
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

        sinon.stub(Order, 'packOrderbyId').returns(inventory);

        supertest(sails.hooks.http.app)
            .post('/order/pack')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .send(data)
            .expect(200)
            .end(function (err, res) {

                Order.find.restore();
                Order.packOrderbyId.restore();

                if (err) return done(err);

                if (!res || !res.text) {
                    return done(new Error('Response not found !!!'));
                }

                if (res.body.body.order_id !== 1) {
                  return done(new Error('Response mismatched !!!'));
                }

                done();
            });

        });

        it('Pack Order End Point (param less)', function (done) {

          supertest(sails.hooks.http.app)
              .post('/order/pack')
              .set('key', process.env.API_KEY)
              .set('token', process.env.TOKEN)
              .expect(500, done);

        });
    });

    //calculate Total
    let listItem = [];
    listItem.push({sale_price : 10.5,price : 20.5, quantity:5.5})
    describe('#calculateTotal', function () {
        it('calculate Total', function (done) {
            let total = staticMethod.calculateTotal(listItem)
            if (total == NaN || total == undefined){
                return done(new Error('Total is not Appropriate !!!'));
            }
            done();
        });
    });

});
