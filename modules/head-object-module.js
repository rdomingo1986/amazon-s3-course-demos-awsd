const { s3 } = require('./s3-client.js');

const util = require('util');

module.exports.HeadObject = async function (key) {
  try {
    return await s3.headObject({
      Bucket: 'awsd-officialcourse-demo-amazon-s3',
      Key: key
    });
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};