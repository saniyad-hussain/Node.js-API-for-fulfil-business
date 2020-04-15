let mock = require('sails-mock-models');

describe('User (model)', function() {

  describe('#encryptUserId()', function() {

    it('should return encrypted string from input (1)', function (done) {
      let encryptId = User.encryptUserId("1");

      let outputKey = "63ec59c9e58c1151ca6f3c7ec4d3d5740522f4e98494fc4117" +
        "fa944a0319ba21f1f347d96387ec5e7216d281dde3d20abb5341d1168f664880fdf" +
        "5041e8cae65a4985bf9e9fb720f027c5f7709886836";

      if (encryptId !== outputKey) {
        return done(new Error('Encryption is not matched'));
      }

      return done();
    });

  });

  describe('#decryptUserKey()', function() {

    it('should return decrypted string (1) from encrypted input string', function (done) {

      let inputKey = "63ec59c9e58c1151ca6f3c7ec4d3d5740522f4e98494fc4117" +
        "fa944a0319ba21f1f347d96387ec5e7216d281dde3d20abb5341d1168f664880fdf" +
        "5041e8cae65a4985bf9e9fb720f027c5f7709886836";

      let decryptedId = User.decryptUserKey(inputKey);

      if (decryptedId !== "1") {
        return done(new Error('Decryption is not matched'));
      }

      return done();
    });

  });

});
