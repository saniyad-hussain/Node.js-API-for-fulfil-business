/**
 * FeatureflagController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const localStorage = require('localStorage');
module.exports = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
    local: async function(req, res) {
        const data = await Featureflag.find();
        const array = [];
        let str = '{';
        for(let i=0; i<data.length; i++) {
           if (i+1 === data.length) {
            str += `${data[i].flags}`;
           }else{
             str += `${data[i].flags},`;
            }
        }
        str += '}';
        array.push(JSON.parse(str));
        res.json(array);
        const final = [];
          for(const key in array) {
            for(const innerKey in array[key]) {
              final.push({'key': innerKey, 'value' : array[key][innerKey]});
           }
         }
        localStorage.setItem('localFeature', JSON.stringify(final));
    }
};

