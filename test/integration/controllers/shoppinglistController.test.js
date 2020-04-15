let sinon = require('sinon');
let supertest = require('supertest');
let mock = require('sails-mock-models');

describe('Shopinglist', function () {

    describe('#getItem', function () {
        let userToken = 'ee1b70e99b21c6315500528f019e004d08501dba7b1' +
        '3bc584fdef7fe8b166a9bcd0475f90db97b665f335d583'+
      '13fba6057f50d9a287601cffb394358137eefdfd9c0a23b37a29f50b187b7372994576b';

        it('get new item from shoppinglist', function (done) {

          let shoppinglist = [
            {
              createdAt : 123123123,
              updatedAt : 123123123,
              id: 1,
              user_id : 1,
              product_id : 1
            },
            {
              createdAt : 123123123,
              updatedAt : 123123123,
              id: 2,
              user_id : 1,
              product_id : 2
            }
          ];
          mock.mockModel(Shoppinglist, 'find', shoppinglist);

          let shopping = [
            {
              createdAt: 1549651234555,
              updatedAt: 1550772140693,
              id: 1,
              name: "Blue Monkey Coconut Water",
              sku: 0,
              upc: "59654705007",
              price: 0,
              sale_price: 0,
              category_id: 0,
              is_selectable_meat: false,
              is_selectable_produce: false,
            },
            {
              createdAt: 1549651234555,
              updatedAt: 1550772140693,
              id: 2,
              name: "Blue Monkey Coconut Water second",
              sku: 0,
              upc: "59654705007",
              price: 0,
              sale_price: 0,
              category_id: 0,
              is_selectable_meat: false,
              is_selectable_produce: false,
            },
          ];

          sinon.stub(Product, 'find').returns({
            where: sinon.stub().returns(shopping)
          });

            supertest(sails.hooks.http.app)
                .get('/shoppinglist?user_token='+userToken)
                .set('Accept', 'application/json')
                .set('key', process.env.API_KEY)
                .set('token', process.env.TOKEN)
                .expect(200)
                .end(function (err, res) {

                  Shoppinglist.find.restore();
                  Product.find.restore();

                    if (err) return done(err);
                    if (!res || !res.text) {
                        return done(new Error('Response not found !!!'));
                    }
                    if (res.body.length == 0 || res.body[0].id == null) {
                    return done(new Error('Response mismatched !!!'));
                    }
                    done();
                });
        });

        it('get new item from shoppinglist (params less)', function (done) {
          supertest(sails.hooks.http.app)
            .get('/shoppinglist')
            .set('Accept', 'application/json')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .expect(500, done);
        });
    });

    describe('#addItem', function () {
        it('add new item in shoppinglist', function (done) {

            let userToken ='ee1b70e99b21c6315500528f019e004d08501' +
            'dba7b13bc584fdef7fe8b166a9bcd0475f90db97b665f335d58313'+
          'fba6057f50d9a287601cffb394358137eefdfd9c0a23b37a29f50b187b7372994576b';

            let data = {
              user_token : userToken,
              product_id : 1
            };

            let shoppinglist = [{
                createdAt : 123123123,
                updatedAt : 123123123,
                id: 1,
                user_id : 1,
                product_id : 1
              }];

            sinon.stub(Shoppinglist, 'create').returns({
              fetch: sinon.stub().returns(shoppinglist)
            });

            supertest(sails.hooks.http.app)
                .post('/shoppinglist')
                .send(data)
                .set('Accept', 'application/json')
                .set('key', process.env.API_KEY)
                .set('token', process.env.TOKEN)
                .expect(200)
                .end(function (err, res) {

                  Shoppinglist.create.restore();

                    if (err) return done(err);

                    if (!res || !res.text) {
                        return done(new Error('Response not found !!!'));
                    }
                    if (res.body[0].product_id != 1) {
                        return done(new Error('Response is mismatched !!!'));
                    }
                    done();
                });
        });
    });

    describe('#deleteItem', function () {
    let userToken ='ee1b70e99b21c6315500528f019e004d08501dba7b1' +
      '3bc584fdef7fe8b166a9bcd0475f90db97b665f335d583'+
      '13fba6057f50d9a287601cffb394358137eefdfd9c0a23b37a29f50b187b7372994576b';

    it('delete item from shoppinglist', function (done) {

      mock.mockModel(Shoppinglist, 'destroy', true);

      supertest(sails.hooks.http.app)
        .delete('/shoppinglist?user_token='+userToken)
        .set('Accept', 'application/json')
        .set('key', process.env.API_KEY)
        .set('token', process.env.TOKEN)
        .expect(200)
        .end(function (err, res) {

          Shoppinglist.destroy.restore();

          if (err) return done(err);

          if (!res || !res.text) {
            return done(new Error('Response not found !!!'));
          }
          done();
        });
    });

  });

});
