const { s3 } = require('./modules/s3-client');

const util = require('util');

const run = async function () {
  try {
    var response = await s3.listBuckets({});
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();