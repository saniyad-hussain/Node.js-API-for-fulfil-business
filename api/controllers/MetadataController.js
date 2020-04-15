/**
 * MetadataController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  feed: async (req, res) => {
    const result = await Metadata.getMetaData();
    res.json(result);
  }

};
