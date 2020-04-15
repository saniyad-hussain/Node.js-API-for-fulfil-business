/**
 * ImagesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
   *
   * @param {Object} data
   * @param {Response} res
   */
  unlabelledImages: async function(data, res) {
    const productId = data.query.product_id;
    const imageType = data.query.image_type;
    const startDate = data.query.startDate;
    const endDate = data.query.endDate;
    const from = data.query.from;
    const labeled = data.query.labelled;
    const unLabeled = data.query.unlabelled;
    let condition = '';
    if (labeled === 'yes' && unLabeled === 'yes') {
      condition += '(total > 0 OR total = 0)';
    } else if (unLabeled === 'yes') {
      condition += '(total = 0)';
    } else if (labeled === 'yes') {
      condition += '(total > 0)';
    }
    let typeStr = '';
    const typeAr = imageType.split(',');
    for (let i = 0; i < typeAr.length; i++) {
      if (i === 0) {
        typeStr += `'${typeAr[i]}'`;
      } else {
        typeStr += `,'${typeAr[i]}'`;
      }
    }
    condition += ` AND image_type IN (${typeStr})`;
    if (startDate !== 'null') {
      condition += ` AND (time_captured >= "${startDate}")`;
    }
    if (endDate !== 'null') {
      condition += ` AND (time_captured <= "${endDate}")`;
    }
    const images = await Images.unlabelledImages(productId, condition, from);
    res.json(images);
  },

  /**
   *
   * @param {Object} data
   * @param {Response} res
   */
  unGradedImages: async function(data, res) {
    const productId = data.query.product_id;
    const startDate = data.query.startDate;
    const endDate = data.query.endDate;
    const gradingType = data.query.gradingType;
    const pageNumber = data.query.pageNumber;
    const operator = data.query.operator;
    const randomize = data.query.randomize;
    let isGetGradedImages = false;
    let condition = '';
    let countConPid = '';
    let countConDate = '';

    if (gradingType.toLowerCase() === 'graded') {
      isGetGradedImages = true;
    }
    if (productId) {
      condition += `where inventory_id in (select id from inventory where product_id=${productId})`;
      countConPid += ` AND product_id=${productId}`;
    }
    if (startDate) {
      condition += ` AND (time_captured >= "${startDate}")`;
      countConDate += ` AND (time_captured >= "${startDate}")`;
    }
    if (endDate) {
      condition += ` AND (time_captured <= "${endDate}")`;
      countConDate += ` AND (time_captured <= "${endDate}")`;
    }

    const images = await Images.unGradedImages(
      condition,
      countConPid,
      countConDate,
      isGetGradedImages,
      pageNumber,
      operator,
      randomize
    );
    res.json(images);
  }
};
