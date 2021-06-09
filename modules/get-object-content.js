const fs = require('fs');
module.exports.GetObjectContent = function (Body, fileName) {
  return new Promise (function (resolve, reject) {
    var objectContent = '';

    Body.on('data', function (chunk) {
      objectContent += chunk;
    });

    Body.on('error', function (err) {
      reject(err);
    });
    
    Body.on('end', function () {
      if(fileName != undefined) fs.writeFileSync(fileName, objectContent);
      resolve(objectContent);
    });
  });
}