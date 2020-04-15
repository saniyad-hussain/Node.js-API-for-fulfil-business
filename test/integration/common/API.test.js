let supertest = require('supertest');

describe('API Endpoint Tester', function() {

  let api_key = '889a68d7-c7e8-4625-9ed3-d49a6e356209';
  let api_url = 'http://api.fulfil.store';
  let api_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJzZWNyZXQiOiIzODEvY2EyNmRmY2JkZGItNjEzYzFiMzc2YzE5ZjViNTI1PSIsImFwaUtleSI6Ijg4OWE2OGQ3LWM3ZTgtNDYyNS05ZWQzLWQ0OWE2ZTM1NjIwOSIsInBlcm1pc3Npb25zIjp7ImFsbG93UXVlcnlBbGxPcmRlcnMiOnRydWUsImFsbG93Q3Jvc3NPcmlnaW5BY2Nlc3MiOnRydWUsImFsbG93TW9kaWZ5Q2FydCI6dHJ1ZSwiYWxsb3dSZXNldEFsbE9yZGVyIjp0cnVlLCJhbGxvd0NhcnRPcGVyYXRpb24iOnRydWUsImFsbG93TW9kaWZ5SW52ZW50b3J5Ijp0cnVlLCJhbGxvd09yZGVyUGxhY2UiOnRydWUsImFsbG93R2V0T3JkZXJCeVVzZXIiOnRydWUsImFsbG93TW9kaWZ5U2hvcHBpbmciOnRydWUsImFsbG93R2V0U2hvcHBpbmciOnRydWUsImFsbG93Q3JlYXRlVXNlciI6dHJ1ZSwiYWxsb3dHZXRVc2VyIjp0cnVlLCJhbGxvd0FkZFJlbW92ZUl0ZW1Gcm9tQ2FydCI6dHJ1ZSwiYWxsb3dHZW5lcmF0ZURlbW9PcmRlciI6dHJ1ZX0sImlzc3VlZCI6MTU2MzIxNDg2NDM2M30sImlhdCI6MTU2MzIxNDg2NH0.fvEKfFj2vWaSi0i8mYTrIwzeB-ir9Xlw6gSMz_bBpnU';

  describe('#getUserByKey' , function() {
    it('should get user detail by encrypted key', function (done) {

      let userId = "63ec59c9e58c1151ca6f3c7ec4d3d5740522f4e98494fc4117" +
        "fa944a0319ba21f1f347d96387ec5e7216d281dde3d20abb5341d1168f664880fdf" +
        "5041e8cae65a4985bf9e9fb720f027c5f7709886836";

      supertest(api_url)
        .get('/user/get')
        .set('key', api_key)
        .set('token', api_token)
        .query({ userId })
        .expect(200, done);

    });
  });

  describe('#getCart', () => {
    it('Get Cart by ID', (done) => {

      supertest(api_url)
        .get('/cart/get?id=1')
        .set('Accept', 'application/json')
        .set('key', api_key)
        .set('token', api_token)
        .expect(200, done)

    });

    // Get Cart by userkey Test Case
    it('Get Cart by userKey', (done) => {

      let user_key = 'd0cf183e85f7eb79eb9d069f5f266eee990ca277cf2df8fc31e6eb1bc' +
        '86684dc45bcaab67e36555d079d67669a33d8161a9576852011fd679f3c' +
        '90cc1bcf2fc4033628c2df89dc99082443059c65206c';

      supertest(api_url)
        .get(`/cart/get?userKey=${user_key}`)
        .set('Accept', 'application/json')
        .set('key', api_key)
        .set('token', api_token)
        .expect(200, done);

    });

  });

  describe('#doesCartRequireSelections', () => {
    it('Does Cart Require Selections (without selectable records)', (done) => {

      supertest(api_url)
        .get('/cart/hasUnselectedSelectables?cart_id=1')
        .set('Accept', 'application/json')
        .set('key', api_key)
        .set('token', api_token)
        .expect(200, done);

    });

  });

  describe('#metadata', () => {
    // Get Cart by userkey Test Case
    it('Metadata', (done) => {

      supertest(api_url)
        .get('/metadata/feed')
        .set('Accept', 'application/json')
        .set('key', api_key)
        .set('token', api_token)
        .expect(200 , done);

    });
  });

  describe('#getOrdersByUserToken', () => {
    // Get Cart by userkey Test Case
    it('Get Order by userToken', (done) => {

      supertest(api_url)
        .get('/order?user_token=63ec59c9e58c1151ca6f3c7ec4d3d5740522f4e98494fc4117' +
          'fa944a0319ba21f1f347d96387ec5e7216d281dde3d20abb5341d1168f664880fdf' +
          '5041e8cae65a4985bf9e9fb720f027c5f7709886836')
        .set('Accept', 'application/json')
        .set('key', api_key)
        .set('token', api_token)
        .expect(200, done);

    });
  });

  describe('#getItem', function () {
    let userToken ='ee1b70e99b21c6315500528f019e004d08501dba7b1' +
      '3bc584fdef7fe8b166a9bcd0475f90db97b665f335d583'+
      '13fba6057f50d9a287601cffb394358137eefdfd9c0a23b37a29f50b187b7372994576b';

    it('get new item from shoppinglist', function (done) {

      supertest(api_url)
        .get('/shoppinglist?user_token='+userToken)
        .set('Accept', 'application/json')
        .set('key', api_key)
        .set('token', api_token)
        .expect(200, done);

    });

  });


});
