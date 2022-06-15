const { ListObjectVersions } = require('./modules/list-object-versions-module.js');

const { DeleteObjectById } = require('./modules/delete-object-by-id-module');

const util = require('util');

const run = async function () {
  try {
    const bucketName = process.argv[2];
    var nextKeyMarker = undefined;
    do {
      var response = await ListObjectVersions(bucketName, nextKeyMarker);
      var versions = response.Versions;
      nextKeyMarker = response.KeyMarker;
      if(versions != undefined) {
        versions.forEach(function (item) {
          (async function () {
            await DeleteObjectById(bucketName, item.Key, item.VersionId)
          })();
        });
      }
    } while (nextKeyMarker != undefined && versions != undefined)
    
    
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
}

run();