const { HeadObject } = require('./modules/head-object-module.js');

const { GetObjectContent } = require('./modules/get-object-content.js');

const { s3 } = require('./modules/s3-client.js');

const util = require('util');

const fs = require('fs');

const { uuid } = require('uuidv4');

const createPromise = function (range, inx) {
  return new Promise (function (resolve, reject) {
    s3.getObject({
      Bucket: 'awsd-officialcourse-demo-amazon-s3',
      Key: process.argv[2],
      Range: range
    }, function (err, res) {
      if (err) return reject(err);
      (async function () {
        var content = await GetObjectContent(res.Body, process.argv[2].split('.')[0] + '.part' + inx);
        resolve(content);
      })();
    });
  });
}

const run = async function () {
  try {
    const contentLength = (await HeadObject(process.argv[2])).ContentLength;
    
    const chunksSize = parseInt(contentLength / process.argv[3]);
    var bytesGroup = [];
    var flag = -1;
    do {
      bytesGroup.push('bytes=' + (flag + 1) + '-' + (flag + chunksSize));
      flag = (flag + chunksSize) >= contentLength ? contentLength : flag + chunksSize;
    } while (flag < contentLength);
    
    const promises = [];

    bytesGroup.forEach(function (item, inx) {
      promises.push(createPromise(item, inx + 1));
    });

    const response = await Promise.all(promises);
    var file = '';
    response.forEach(function (item) {
      file += item;
    });
    fs.writeFileSync(process.argv[2].split('.')[0] + uuid().substr(0, 7) + '.' + process.argv[2].split('.')[1], file);
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
}

run();