require('dotenv').config();

var AWS = require('aws-sdk');
var md5 = require('md5');

var bucketName = process.argv[2];
var objectName = process.argv[3];
var message = process.argv[4] === undefined ? 'Developing on AWS!!!' : process.argv[4];

var config = {
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
};

var s3 = new AWS.S3(config);

var md5Hash = md5(message);
var modifiedMessage = message + '!!!';

var requestParams = {
  Bucket: bucketName,
  Key: objectName,
  Body: modifiedMessage
};

s3.putObject(requestParams, function(err, response) {
  if (err) return console.log(err);
  console.log(response, md5(modifiedMessage), md5Hash);
  if(response.Etag != md5Hash) return console.log('La data ha sido modificada en transito');
});
