require('dotenv').config();

var AWS = require('aws-sdk');
var fs = require('fs');

var bucketName = process.argv[2];
var objectName = process.argv[3];
var bitRangeOne = process.argv[4];
var bitRangeTwo = process.argv[5];

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

var getOne = new Promise(function (resolve) {
  requestParams.Range = 'bytes=' + bitRangeOne;
  s3.getObject(requestParams, function (err, response) {
    if(err) return console.log(err);
    console.log('Part one', response.Body);
    fs.writeFileSync(objectName + '.part1', response.Body);
    resolve(response);
  });
});

var getTwo = new Promise(function (resolve) {
  requestParams.Range = 'bytes=' + bitRangeTwo;
  s3.getObject(requestParams, function (err, response) {
    if(err) return console.log(err);
    console.log('Part two', response.Body);
    fs.writeFileSync(objectName + '.part2', response.Body);
    resolve(response);
  });
});

Promise.all([getOne, getTwo]).then(function (parts) {
  fs.writeFileSync(objectName, (parts[0].Body + parts[1].Body));
}, function (err) {
  console.log(err);
});