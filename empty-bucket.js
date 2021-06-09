const { ListObjectVersions } = require('./modules/list-object-versions-module.js');

const { DeleteObjectById } = require('./modules/delete-object-by-id-module');

const util = require('util');

const run = async function () {
  try {
    const versions = (await ListObjectVersions()).Versions;
    versions.forEach(function (item) {
      (async function () {
        await DeleteObjectById(item.Key, item.VersionId)
      })();
    });
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
}

run();