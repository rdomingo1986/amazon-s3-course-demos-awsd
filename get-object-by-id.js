const { s3 } = require('./modules/s3-client.js');

const { GetObjectContent } = require('./modules/get-object-content.js');

const util = require('util');

const { uuid } = require('uuidv4');

const run = async function () {
  try {
    const body = (await s3.getObject({
      Bucket: 'awsd-officialcourse-demo-amazon-s3',
      Key: 'versioning.txt',
      VersionId: process.argv[2]
    })).Body;
    const content = await GetObjectContent(body, 'versioning-' + uuid().substr(0, 7) + '.txt');
    console.log(util.inspect(content, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();