const { s3 } = require('./modules/s3-client.js');

const util = require('util');

const fs = require('fs');

const run = async function () {
  try {
    var response = await s3.uploadPart({
      Bucket: 'awsd-officialcourse-demo-amazon-s3',
      Key: 'video.mp4',
      Body: fs.readFileSync(process.argv[2]),
      UploadId: process.argv[3],
      PartNumber: process.argv[4]
    });
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();