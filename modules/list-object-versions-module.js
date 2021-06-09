const { s3 } = require('./s3-client.js');

const util = require('util');

module.exports.ListObjectVersions = async function () {
  try {
    return await s3.listObjectVersions({
      Bucket: 'awsd-officialcourse-demo-amazon-s3',
      Prefix: ''
    });
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};