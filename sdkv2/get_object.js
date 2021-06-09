require('dotenv').config();

var AWS = require('aws-sdk');
var fs = require('fs');

var bucketName = process.argv[2];
var objectName = process.argv[3];

var config = {
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
};

var s3 = new AWS.S3(config);

var requestParams = {
  Bucket: bucketName, 
  Key: objectName
};

s3.getObject(requestParams, function (err, response) {
  if (err) return console.log(err);
  console.log(response.Body.toString('utf8'));
  // fs.writeFileSync(objectName, response.Body);
});