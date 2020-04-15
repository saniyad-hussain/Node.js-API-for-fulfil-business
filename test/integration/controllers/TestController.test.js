let supertest = require('supertest');

describe('TestController', function () {
    //Metadata Test Case
    describe('#test', function () {
        it('Test', function (done) {
            supertest(sails.hooks.http.app)
                .get('/test')
                .set('Accept', 'application/json')
                .set('key', process.env.API_KEY)
                .set('token', process.env.TOKEN)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    if (!res || !res.text) {
                        return done(new Error('Response not found !!!'));
                    }
                    done();
                });
        });
    });
});
