require('dotenv').config();

var AWS = require('aws-sdk');
var splitFile = require('split-file');
var fs = require('fs');

var config = {
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
};

var s3 = new AWS.S3(config);

splitFile.splitFile('2. Keeping Up To Date.mp4', 2).then(function (parts) {
  console.log(parts);
  s3.createMultipartUpload({
    Bucket: process.argv[2],
    Key: process.argv[3]
  }, function (err, response) {
    if (err) return console.log(err);
    console.log(response);
    var uploadId = response.UploadId;

    Promise.all([
      new Promise (function (resolve, reject) {
        s3.uploadPart({
          Bucket: process.argv[2],
          Key: process.argv[3],
          PartNumber: 1,
          Body: fs.readFileSync(parts[0]),
          UploadId: uploadId
        }, function (err, response) {
          if (err) return reject(err);
          console.log('Part one:', response);
          resolve(response);
        });
      }),
      new Promise (function (resolve, reject) {
        s3.uploadPart({
          Bucket: process.argv[2],
          Key: process.argv[3],
          PartNumber: 2,
          Body: fs.readFileSync(parts[1]),
          UploadId: uploadId
        }, function (err, response) {
          if (err) return reject(err);
          console.log('Part two:', response);
          resolve(response);
        });
      })
    ]).then(function (response) {
      console.log(response);
      s3.listParts({
        Bucket: process.argv[2],
        Key: process.argv[3],
        UploadId: uploadId
      }, function (err, response) {
        if (err) return console.log(err);
        console.log(response);
        var parts = response.Parts;
        console.log(parts);
        parts.forEach(function (el, i) {
          delete parts[i].LastModified,
          delete parts[i].Size;
        });
        console.log('--');
        console.log(parts);
        var obj = { Parts: parts};
        s3.completeMultipartUpload({
          Bucket: process.argv[2],
          Key: process.argv[3],
          UploadId: uploadId,
          MultipartUpload: obj
        }, function (err, response) {
          if (err) return console.log(err);
          console.log(response);
        });
      });
    }).catch(function (err) {
      console.log(err);
    })
  });
}).catch(function (err) {
  console.log(err);
});
