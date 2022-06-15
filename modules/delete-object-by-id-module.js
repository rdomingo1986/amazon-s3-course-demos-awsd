const { s3 } = require('./s3-client.js');

const util = require('util');

module.exports.DeleteObjectById = async function (bucketName, key, versionId) {
  try {
    return await s3.deleteObject({
      Bucket: bucketName,
      Key: key,
      VersionId: versionId
    });
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};