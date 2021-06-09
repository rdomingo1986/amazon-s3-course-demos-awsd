require('dotenv').config();

var AWS = require('aws-sdk');

var config = {
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
};

var s3 = new AWS.S3(config);

s3.abortMultipartUpload({
  Bucket: process.argv[2],
  Key: process.argv[3],
  UploadId: process.argv[4]
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});