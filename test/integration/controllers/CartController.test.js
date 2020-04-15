let sinon = require('sinon');
let mock = require('sails-mock-models');
let supertest = require('supertest');
let inventoryController = require('../../../api/controllers/InventoryController.js');

describe('CartController', () => {

    // Create Cart Test Case
    describe('#createCart', () => {
        it('Create Cart', (done) => {

            let cartData = [
              {
                "createdAt": 1554959972000,
                "updatedAt": 1554959972000,
                "id": 1,
                "user_id": 1
              }
            ];

            sinon.stub(Cart, 'addToCartByUser').returns(cartData);
            sinon.stub(Cart, 'getCartByUser').returns(cartData);

            supertest(sails.hooks.http.app)
                .get(`/cart/create?userKey=${process.env.USER_ID}`)
                .set('Accept', 'application/json')
                .set('key', process.env.API_KEY)
                .set('token', process.env.TOKEN)
                .expect(200)
                .end((err, res) => {

                    Cart.addToCartByUser.restore();
                    Cart.getCartByUser.restore();

                    if (err) return done(err);

                    if (!res || !res.body) {
                        return done(new Error('Response not found !!!'));
                    }

                    if (res.body[0].id !== 1) {
                      return done(new Error('Response is mismatched !!!'));
                    }

                    done();
                });
        });

        it('Create Cart (without passing params)', (done) => {

          supertest(sails.hooks.http.app)
            .get('/cart/create')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .set('Accept', 'application/json')
            .expect(500, done);

        });
    });

    // Get Cart by id Test Case
    describe('#getCart', () => {
        it('Get Cart by ID', (done) => {

          let data = {
            createdAt: 1554959972000,
            updatedAt: 1554959972000,
            id: 100,
            user_id: 1
          };
          mock.mockModel(Cart, 'findOne', data);

            supertest(sails.hooks.http.app)
                .get('/cart/get?id=100')
                .set('Accept', 'application/json')
                .set('key', process.env.API_KEY)
                .set('token', process.env.TOKEN)
                .expect(200)
                .end((err, res) => {
                    Cart.findOne.restore()
                    if (err) return done(err);

                    if (!res || !res.text) {
                        return done(new Error('Response not found !!!'));
                    }

                    if (res.body.data.id !== 100) {
                      return done(new Error('Response mismatched !!!'));
                    }

                    done();
                });
        });

        // Get Cart by userkey Test Case
        it('Get Cart by userKey', (done) => {

          let data = {
            createdAt: 1554959972000,
            updatedAt: 1554959972000,
            id: 100,
            user_id: 1
          };

          mock.mockModel(Cart, 'findOne', data);

          supertest(sails.hooks.http.app)
            .get(`/cart/get?userKey=${process.env.USER_ID}`)
            .set('Accept', 'application/json')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .expect(200)
            .end((err, res) => {
              Cart.findOne.restore();
              if (err) return done(err);
              if (!res || !res.text) {
                return done(new Error('Response not found !!!'));
              }

              if (res.body.data.user_id !== 1) {
                return done(new Error('Response mismatched !!!'));
              }

              done();
            });
        });

        // Get Cart (without params) Test Case
        it('Get Cart (without params)', (done) => {

          supertest(sails.hooks.http.app)
            .get('/cart/get')
            .set('Accept', 'application/json')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .expect(500, done);
        });
    });

    // Add To Cart test Case ( selectable meat)
    describe('#addToCart', () => {
        let data = {
            product_id: "1",
            cart_id: "1"
        };
        it('Add To Cart (with selectable)', (done) => {

          let product = [
            {
              createdAt: 1549651234555,
              updatedAt: 1550772140693,
              id: 1,
              name: "Blue Monkey Coconut Water",
              variant_id: null,
              sku: 0,
              upc: "59654705007",
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
              is_selectable_meat: true,
              is_selectable_produce: false,
              nominal_size: "",
              unit_type: ""
            }
          ];

          let cartItem = [
            {
              createdAt: 1550770841717,
              updatedAt: 1550770841717,
              id: 1,
              product_id: 1,
              quantity: 1,
              cart_id: 1,
              is_virtual: true
            }
          ];

          mock.mockModel(Product, 'find', product);
          sinon.stub(CartItem, 'create').returns({
            fetch : sinon.stub().returns(cartItem)
          });

          let inventory = {
            createdAt: 1553743968642,
            updatedAt: 1553743968642,
            id: 1,
            location_id: 0,
            is_graded_item: false,
            product_id: 1,
            is_reserved: true,
            reservation_expires: 1553743968642,
            reservation_cart_id: null,
            grade_id: 0,
            note: null,
            price_override: 0,
            weight_override: 0,
            image_override: "",
            scan_data: ""
          };

          sinon.stub(inventoryController, 'attemptReserve').resolves(inventory);

          supertest(sails.hooks.http.app)
              .post('/cart/addItem')
              .send(data)
              .set('Accept', 'application/json')
              .set('key', process.env.API_KEY)
              .set('token', process.env.TOKEN)
              .expect(200)
              .end((err, res) => {

                  Product.find.restore();
                  CartItem.create.restore();
                  inventoryController.attemptReserve.restore();

                  if (err) return done(err);

                  if (res.body.product_id !== 1 && res.body.is_virtual === true) {
                    return done(new Error('Response mismatched !!!'));
                  }

                  done();
              });
        });

        it('Add To Cart (without selectable)', (done) => {
          let product = [
            {
              createdAt: 1549651234555,
              updatedAt: 1550772140693,
              id: 1,
              name: "Blue Monkey Coconut Water",
              variant_id: null,
              sku: 0,
              upc: "59654705007",
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

          let cartItem = [
            {
              createdAt: 1550770841717,
              updatedAt: 1550770841717,
              id: 1,
              product_id: 1,
              quantity: 1,
              cart_id: 1,
              is_virtual: false
            }
          ];

          let inventory = {
            createdAt: 1553743968642,
            updatedAt: 1553743968642,
            id: 1,
            location_id: 0,
            is_graded_item: false,
            product_id: 1,
            is_reserved: true,
            reservation_expires: 1553743968642,
            reservation_cart_id: null,
            grade_id: 0,
            note: null,
            price_override: 0,
            weight_override: 0,
            image_override: "",
            scan_data: ""
          };

          sinon.stub(inventoryController, 'attemptReserve').resolves(inventory);

          mock.mockModel(Product, 'find', product);
          sinon.stub(CartItem, 'create').returns({
            fetch : sinon.stub().returns(cartItem)
          });

          supertest(sails.hooks.http.app)
            .post('/cart/addItem')
            .send(data)
            .set('Accept', 'application/json')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .expect(200)
            .end((err, res) => {

              Product.find.restore();
              CartItem.create.restore();
              inventoryController.attemptReserve.restore();

              if (err) return done(err);

              if (res.body.product_id !== 1 && res.body.is_virtual === true) {
                return done(new Error('Response mismatched !!!'));
              }

              done();
            });
        });

        it('Add To Cart (without params)', (done) => {
          supertest(sails.hooks.http.app)
            .post('/cart/addItem')
            .set('Accept', 'application/json')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .expect(500, done);
        });
    });

    //Does Cart Require Selections Test Case
    describe('#doesCartRequireSelections', () => {
        it('Does Cart Require Selections (without selectable records)', (done) => {

          let cartItem = [
            {
              name : 'product 1',
              id: 1,
              cart_id: 1,
              is_selectable_meat: true
            },
            {
              name : 'product 1',
              id: 1,
              cart_id: 1,
              is_selectable_meat: false
            }
          ];

          sinon.stub(Cart, 'getSelectableItemsFromCart').returns([]);

            supertest(sails.hooks.http.app)
                .get('/cart/hasUnselectedSelectables?cart_id=1')
                .set('Accept', 'application/json')
                .set('key', process.env.API_KEY)
                .set('token', process.env.TOKEN)
                .expect(200)
                .end((err, res) => {
                    Cart.getSelectableItemsFromCart.restore();
                    if (err) return done(err);

                    if (!res || !res.text) {
                        return done(new Error('Response not found !!!'));
                    }

                    if (res.body.status === true) {
                      return done(new Error('Response is not matched !!!'));
                    }

                    done();
                });
        });

      it('Does Cart Require Selections (with selectable records)', (done) => {

        let cartItem = [
          {
            name : 'product 1',
            id: 1,
            cart_id: 1,
            is_selectable_meat: true
          },
          {
            name : 'product 1',
            id: 2,
            cart_id: 1,
            is_selectable_meat: true
          }
        ];

        let inventory = [
          {}
        ];

        sinon.stub(Cart, 'getSelectableItemsFromCart').returns(cartItem);
        sinon.stub(Cart, 'getReservedProduct').returns(inventory);

        supertest(sails.hooks.http.app)
          .get('/cart/hasUnselectedSelectables?cart_id=1')
          .set('Accept', 'application/json')
          .set('key', process.env.API_KEY)
          .set('token', process.env.TOKEN)
          .expect(200)
          .end((err, res) => {
            Cart.getSelectableItemsFromCart.restore();
            Cart.getReservedProduct.restore();
            if (err) return done(err);

            if (!res || !res.text) {
              return done(new Error('Response not found !!!'));
            }

            if (res.body.status === false) {
              return done(new Error('Response is not matched !!!'));
            }

            done();
          });
      });

      it('Does Cart Require Selections (without params)', (done) => {

        supertest(sails.hooks.http.app)
          .get('/cart/hasUnselectedSelectables')
          .set('Accept', 'application/json')
          .set('key', process.env.API_KEY)
          .set('token', process.env.TOKEN)
          .expect(500, done);

      });

    });

    //Remove All From Cart test case
    describe('#removeAllFromCart', () => {
        let data = {
            product_id: "1",
            cart_id: "1"
        };
        it('Remove All From Cart', (done) => {

            sinon.stub(Cart ,'releaseReservationOfProduct').returns([]);
            sinon.stub(Cart, 'deleteCartItem').returns(1);

            supertest(sails.hooks.http.app)
                .delete('/cart/all')
                .set('key', process.env.API_KEY)
                .set('token', process.env.TOKEN)
                .send(data)
                .expect(200)
                .end((err, res) => {

                    Cart.releaseReservationOfProduct.restore();
                    Cart.deleteCartItem.restore();

                    if (err) return done(err);

                    if (!res || !res.text) {
                        return done(new Error('Response not found !!!'));
                    }

                    if (res.body.status !== 'OK') {
                      return done(new Error('Response is mismatched !!!'));
                    }

                    done();
                });
        });

        it('Remove All From Cart (if error occurred in query)', (done) => {

          sinon.stub(Cart ,'releaseReservationOfProduct').returns([]);
          sinon.stub(Cart, 'deleteCartItem').returns(0);

          supertest(sails.hooks.http.app)
            .delete('/cart/all')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .send(data)
            .expect(500, done);

        });

      it('Remove All From Cart (without passing params)', (done) => {

        supertest(sails.hooks.http.app)
          .delete('/cart/all')
          .set('key', process.env.API_KEY)
          .set('token', process.env.TOKEN)
          .expect(500, done);

      });
    });

    //Remove From Cart test case
    describe('#removeFromCart', () => {
        let data = {
            product_id: "1",
            cart_id: "1"
        };

        it('Remove From Cart (without passing params)', (done) => {
          supertest(sails.hooks.http.app)
            .delete('/cart')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .expect(500, done);
        });

        it('Remove From Cart (if selectable not exits)', (done) => {

          let product = [
            {
              createdAt: 1549651234555,
              updatedAt: 1550772140693,
              id: 1,
              name: "Blue Monkey Coconut Water",
              variant_id: null,
              sku: 0,
              upc: "59654705007",
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

          mock.mockModel(Product, 'find', product);
          sinon.stub(Cart, 'releaseReservationOfOneProduct').returns([]);
          sinon.stub(Cart, 'deleteOneCartItem').returns(1);

          supertest(sails.hooks.http.app)
            .delete('/cart')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .send(data)
            .expect(200)
            .end((err, res) => {

              Product.find.restore();
              Cart.releaseReservationOfOneProduct.restore();
              Cart.deleteOneCartItem.restore();

              if (err) return done(err);

              if (!res || !res.text) {
                return done(new Error('Response not found !!!'));
              }

              if (res.body.status !== 'OK') {
                return done(new Error('Response is mismatched !!!'));
              }

              done();
            });
        });

        it('Remove From Cart (if selectable exits)', (done) => {

            let product = [
              {
                createdAt: 1549651234555,
                updatedAt: 1550772140693,
                id: 1,
                name: "Blue Monkey Coconut Water",
                variant_id: null,
                sku: 0,
                upc: "59654705007",
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
                is_selectable_meat: true,
                is_selectable_produce: false,
                nominal_size: "",
                unit_type: ""
              }
            ];

            mock.mockModel(Product, 'find', product);
            sinon.stub(Cart, 'deleteOneCartItem').returns(1);

            supertest(sails.hooks.http.app)
              .delete('/cart')
              .set('key', process.env.API_KEY)
              .set('token', process.env.TOKEN)
              .send(data)
              .expect(200)
              .end((err, res) => {

                Product.find.restore();
                Cart.deleteOneCartItem.restore();

                if (err) return done(err);

                if (!res || !res.text) {
                  return done(new Error('Response not found !!!'));
                }

                if (res.body.status !== 'OK') {
                  return done(new Error('Response is mismatched !!!'));
                }

                done();
              });

          });
    });

    // Add To Cart By InventoryId test Case
    describe('#addToCartByInventoryId', () => {
        let data = {
            cart_id: "1",
            inventory_id: "1"
        };

        it('Add To Cart By InventoryId (without passing params)', (done) => {
          supertest(sails.hooks.http.app)
            .post('/cart/addInventoryItem')
            .set('Accept', 'application/json')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .expect(500, done);
        });

        it('Add To Cart By InventoryId', (done) => {

            sinon.stub(Cart, 'reserveProduct').returns(1);

            supertest(sails.hooks.http.app)
                .post('/cart/addInventoryItem')
                .send(data)
                .set('Accept', 'application/json')
                .set('key', process.env.API_KEY)
                .set('token', process.env.TOKEN)
                .expect(200)
                .end((err, res) => {
                    Cart.reserveProduct.restore();
                    if (err) return done(err);
                    done();
                });
        });

      it('Add To Cart By InventoryId (fail case)', (done) => {

        sinon.stub(Cart, 'reserveProduct').returns(0);

        supertest(sails.hooks.http.app)
          .post('/cart/addInventoryItem')
          .send(data)
          .set('Accept', 'application/json')
          .set('key', process.env.API_KEY)
          .set('token', process.env.TOKEN)
          .expect(500, done);
      });

    });

});
