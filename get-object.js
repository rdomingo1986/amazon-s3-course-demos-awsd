const { s3 } = require('./modules/s3-client.js');

const { GetObjectContent } = require('./modules/get-object-content.js');

const util = require('util');

const { uuid } = require('uuidv4');

const run = async function () {
  try {
    const input = {
      Bucket: 'awsd-officialcourse-demo-amazon-s3',
      Key: process.argv[2]
    }
    var fileName = process.argv[2].split('.')[0] + '-' + uuid().substr(0, 7) + '.' + process.argv[2].split('.')[1];
    if(process.argv[3] != undefined) {
      input['Range'] = 'bytes=' + process.argv[3];
      fileName = process.argv[2].split('.')[0] + 'part' + process.argv[4]
    }
    const response = await s3.getObject(input);
    const content = await GetObjectContent(response.Body, fileName);
    // console.log(util.inspect(content, false, null, true))
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();