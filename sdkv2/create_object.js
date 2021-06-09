require('dotenv').config();

var AWS = require('aws-sdk');
var fs = require('fs');

var bucketName = process.argv[2];
var objectName = process.argv[3];
var message = fs.readFileSync('s3faqs.txt');

var config = {
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
};

var s3 = new AWS.S3(config);

var requestParams = {
  Bucket: bucketName,
  Key: objectName,
  Body: message
};

s3.putObject(requestParams, function(err, response) {
  if (err) return console.log(err);
  console.log(response);
});


