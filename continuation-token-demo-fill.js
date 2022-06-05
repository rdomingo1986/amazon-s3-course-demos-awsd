const { s3 } = require('./modules/s3-client.js');

const util = require('util');

const fs = require('fs');

const createPromise = function (inx) {
  return new Promise (function (resolve, reject) {
    s3.putObject({
      Bucket: 'continuation-token-demo',
      Key: 'file' + inx + '.txt',
      Body: fs.readFileSync('continuation-token-file.txt'),
      Metadata: {
        course: 'Developing on AWS',
        'course-code': 'AWSD'
      }
    }, function (err, res) {
      if (err) return reject(err);
      
      resolve(res);
    });
  });
}

const run = async function () {
  try {
    const promises = [];

    for (i = 0; i < 2000; i++) {
      promises.push(createPromise(i));
    }
    
    await Promise.all(promises);
    
    console.log('DONE');
  } catch (err) {
    
    console.log(util.inspect(err, false, null, true));

  }
}

run();