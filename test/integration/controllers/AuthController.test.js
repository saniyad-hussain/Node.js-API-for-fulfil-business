let supertest = require('supertest');
let sinon = require('sinon');
let mock = require('sails-mock-models');

describe('AuthController', function () {
    // Register local user test case
       describe('#register', function () {

        it('Register Local User (user already exists)', function (done) {

          let postData = {
            user_id: process.env.USER_ID,
            email: 'demo@gmail.com',
            password: '123456789',
            first_name: 'demo',
            last_name: 'demo'
          };

          let data = {
            createdAt: 1550768764858,
            updatedAt: 1553324981777,
            id: process.env.USER_ID,
            email: "demo@gmail.com",
            first: "demo",
            last: "demo",
            phone: "",
            phone_verified: false,
            email_verified: false,
            picture: null,
            fb_id: null,
            google_id: null
          };

          mock.mockModel(User, 'findOne', data);

            supertest(sails.hooks.http.app)
                .post('/register')
                .set('key', process.env.API_KEY)
                .set('token', process.env.TOKEN)
                .send(postData)
                .set('Accept', 'application/json')
                .expect(500, () => {
                  User.findOne.restore();
                  done();
                });
        });

         it('Register Local User (params less)', function (done) {

           supertest(sails.hooks.http.app)
             .post('/register')
             .set('key', process.env.API_KEY)
             .set('token', process.env.TOKEN)
             .set('Accept', 'application/json')
             .expect(500, done);
         });
    });

    // Login local user test case
    describe('#login', function () {
        let postData = {
            email: 'pp@gmail.com',
            password: '123456789'
        };
        it('Login Local User', function (done) {

          let data = {
            createdAt: 1550768764858,
            updatedAt: 1553324981777,
            id: process.env.USER_ID,
            email: "pp@gmail.com",
            first: "demo",
            last: "demo",
            phone: "",
            phone_verified: false,
            email_verified: false,
            picture: null,
            fb_id: null,
            google_id: null
          };

          mock.mockModel(User, 'findOne', data);

          supertest(sails.hooks.http.app)
            .post('/login')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .send(postData)
            .set('Accept', 'application/json')
            .expect(500, (err, res)  => {
              User.findOne.restore();
              done();
            });
        });

        it('Login Local User (params less)', function (done) {
          supertest(sails.hooks.http.app)
            .post('/login')
            .set('Accept', 'application/json')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .expect(500, done)
        });
    });

    // logout User test case
    describe('#logout', () => {
        it('logout User', (done) => {

            supertest(sails.hooks.http.app)
            .get('/logout')
            .set('Accept', 'application/json')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .expect(200)
            .end((err, res) => {
                    if (err) return done(err);
                    if (!res || !res.body) {
                        return done(new Error('Response not found !!!'));
                    }
                    done();
                });
        });
    });

    // Register User ByProvider test case
    describe('#registerUserByProvider', function () {

        it('Register User By Provider', function (done) {

          let postData = {
            user_id: process.env.USER_ID,
            email: 'pp@gmail.com',
            password: '123456789',
            first_name: 'pp',
            last_name: 'pp',
            provider: 'kk',
            picture: 'ss',
            providerUserId: '123'
          };


          let data = {
            createdAt: 1550768764858,
            updatedAt: 1553324981777,
            id: process.env.USER_ID,
            email: "pp@gmail.com",
            first: "demo",
            last: "demo",
            phone: "",
            phone_verified: false,
            email_verified: false,
            picture: null,
            fb_id: null,
            google_id: null
          };

          mock.mockModel(User, 'findOne', data);

          sinon.stub(User, 'update').returns({
            set: sinon.stub().returns({
              fetch: sinon.stub().returns(data)
            })
          });

          supertest(sails.hooks.http.app)
              .post('/registerUserByProvider')
              .set('key', process.env.API_KEY)
              .set('token', process.env.TOKEN)
              .send(postData)
              .set('Accept', 'application/json')
              .expect(500, () => {
                  User.findOne.restore();
                  User.update.restore();
                  done();
              });
        });

        it('Register User By Provider (params less)', function (done) {
          supertest(sails.hooks.http.app)
            .post('/registerUserByProvider')
            .set('key', process.env.API_KEY)
            .set('token', process.env.TOKEN)
            .set('Accept', 'application/json')
            .expect(500 , done);
        });
    })
});
