require('dotenv').config();

var AWS = require('aws-sdk');

var bucketName = process.argv[2];
var objectName = process.argv[3];
var versionId = process.argv[4];

var config = {
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
};

var s3 = new AWS.S3(config);

var requestParams = {
  Bucket: bucketName, 
  Key: objectName,
  VersionId: versionId
};

s3.deleteObject(requestParams, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});