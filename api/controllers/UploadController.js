/**
 * UploadController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const {Storage} = require('@google-cloud/storage');
const stream = require('stream');

module.exports = {

  uploadObject : async (req, res) => {

    if (!req.body.image) {
      res.status(500).json({
        message : 'Image file is required'
      });
      return;
    }

    if (!req.body.file_name) {
      res.status(500).json({
        message : 'file name is required'
      });
      return;
    }

    if (!req.body.file_type) {
      res.status(500).json({
        message : 'file type is required'
      });
      return;
    }

    const storage = new Storage({
      keyFilename: './config/google-api-key-storage.json',
      projectId: 'fulfil-web'
    });

    const bucketName = 'fulfil-web.appspot.com';
    const fileName = req.body.file_name;
    const fileType = req.body.file_type;
    const folderName = 'scanner-app';

    const bufferStream = new stream.PassThrough();
    const base64EncodedImageString = req.body.image.replace(/^data:image\/\w+;base64,/, '');
    bufferStream.end(Buffer.from(base64EncodedImageString, 'base64'));

    const bucket = storage.bucket(bucketName);

    const file = bucket.file(`/${folderName}/${fileName}`);

    bufferStream.pipe(file.createWriteStream({
      metadata: {
        contentType: fileType
      },
      public: true,
      validation: 'md5'
    }))
    .on('error', (err) => {

      res.status(500).json({
        message : err
      });

    })
    .on('finish', () => {

      res.json({
        message : 'Uploaded successfully',
        path : `https://storage.googleapis.com/${bucketName}/${folderName}/${fileName}`
      });

    });

  }

};

