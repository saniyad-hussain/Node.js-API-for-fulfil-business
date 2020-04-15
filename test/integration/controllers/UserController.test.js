let supertest = require('supertest');
let mock = require('sails-mock-models');
let sinon = require('sinon');

describe('UserController', function() {

  describe('#createUser', function() {
    it('should create user', function (done) {

      let outputKey = process.env.USER_ID;

      let users =
        {
          id: '1',
          email: 'test@gmail.com',
          first: 'test',
          last: 'test',
          phone: '123',
          password: '123',
          phone_verified: false,
          email_verified: false,
          picture: 'www.google.com',
          fb_id: '123',
          google_id: '123',
          createdAt : 1550841232189,
          updatedAt: 1550841232189
        };

      sinon.stub(User, 'create').returns({
          fetch: sinon.stub().returns(users)
      });

      supertest(sails.hooks.http.app)
        .get('/user/create')
        .set('Accept', 'application/json')
        .set('key', process.env.API_KEY)
        .set('token', process.env.TOKEN)
        .expect(200)
        .end(function (err, res) {

          User.create.restore();

          if (err) return done(err);

          if (!res || !res.text) {
            return done(new Error('Response not found !!!'));
          }

          if (res.body.data.id !== outputKey) {
            return done(new Error('Response is mismatched !!!'));
          }

          done();
        });
    });
  });

  describe('#getUserByKey' , function() {
    it('should get user detail by encrypted key', function (done) {

      let userId = process.env.USER_ID;
      let users =
      {
        id: 1,
        email: 'test@gmail.com',
        first: 'test',
        last: 'test',
        phone: '123',
        password: '123',
        phone_verified: false,
        email_verified: false,
        picture: 'www.google.com',
        fb_id: '123',
        google_id: '123',
        createdAt : 1550841232189,
        updatedAt: 1550841232189
      };
      mock.mockModel(User, 'findOne', users);

      supertest(sails.hooks.http.app)
        .get('/user/get')
        .set('key', process.env.API_KEY)
        .set('token', process.env.TOKEN)
        .query({ userId })
        .expect(200)
        .end(function (err, res) {

          User.findOne.restore();

          if (err) return done(err);

          if (!res || !res.text) {
            return done(new Error('Response not found !!!'));
          }

          done();
        });

    });
  });

});
