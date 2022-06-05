const { s3 } = require('./modules/s3-client.js');

const util = require('util');

const run = async function () {
  try {
    var response = await s3.listObjectsV2({
      Bucket: 'continuation-token-demo',
      ContinuationToken: process.argv[2] ? process.argv[2] : undefined
    });
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();