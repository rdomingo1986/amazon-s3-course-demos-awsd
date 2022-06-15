const { s3 } = require('./s3-client.js');

const util = require('util');

module.exports.ListObjectVersions = async function (bucketName, nextKeyMarker) {
  try {
    return await s3.listObjectVersions({
      Bucket: bucketName,
      Prefix: '',
      NextKeyMarker: nextKeyMarker
    });
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};