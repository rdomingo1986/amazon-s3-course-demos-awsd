const { s3 } = require('./modules/s3-client.js');

const util = require('util');

const run = async function () {
  try {
    var response = await s3.createMultipartUpload({
      Bucket: 'awsd-officialcourse-demo-amazon-s3',
      Key: process.argv[2],
      Metadata: {
        course: 'Developing on AWS',
        'course-code': 'AWSD'
      }
    });
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();