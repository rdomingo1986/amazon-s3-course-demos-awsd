const { s3 } = require('./modules/s3-client.js');

const util = require('util');

const fs = require('fs');

const run = async function () {
  try {
    var response = await s3.listParts({
      Bucket: 'awsd-officialcourse-demo-amazon-s3',
      Key: 'video.mp4',
      UploadId: process.argv[2]
    });
    console.log(util.inspect(response, false, null, true));
    return response;
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();

module.exports.runListParts = () => run();