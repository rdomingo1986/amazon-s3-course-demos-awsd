const { S3 } = require('@aws-sdk/client-s3');

const s3 = new S3({
  region: 'us-east-1'
});

module.exports.s3 = s3;