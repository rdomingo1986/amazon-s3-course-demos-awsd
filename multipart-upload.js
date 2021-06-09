const { s3 } = require('./modules/s3-client.js');

const splitFile = require('split-file');

const util = require('util');

const fs = require('fs');

const createPromise = function (uploadId, inx, part) {
  return new Promise (function (resolve, reject) {
    s3.uploadPart({
      Bucket: 'awsd-officialcourse-demo-amazon-s3',
      Key: process.argv[2],
      PartNumber: inx,
      Body: fs.readFileSync(part),
      UploadId: uploadId
    }, function (err, res) {
      if (err) return reject(err);
      
      resolve(res);
    });
  });
}

const run = async function () {
  try {

    const partsList = await splitFile.splitFile(process.argv[2], process.argv[3]);
    
    var uploadId = (await s3.createMultipartUpload({
      Bucket: 'awsd-officialcourse-demo-amazon-s3',
      Key: process.argv[2]
    })).UploadId;
    
    const promises = [];
    
    for (var i = 1; i <= process.argv[3]; i++) {
      promises.push(createPromise(uploadId, i, partsList[i-1]));
    }
    
    await Promise.all(promises);
    
    const parts = (await s3.listParts({
      Bucket: 'awsd-officialcourse-demo-amazon-s3',
      Key: process.argv[2],
      UploadId: uploadId
    })).Parts;
    
    var response = await s3.completeMultipartUpload({
      Bucket: 'awsd-officialcourse-demo-amazon-s3',
      Key: process.argv[2],
      UploadId: uploadId,
      MultipartUpload: { Parts : parts}
    });
    
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    
    console.log(util.inspect(err, false, null, true));

  }
}

run();