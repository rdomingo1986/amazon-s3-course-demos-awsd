// const { s3 } = require('./s3-client.js');

// const { GetObjectContent } = require('./get-object-content.js');

// const util = require('util');

// module.exports.GetObject = async function (key, range) {
//   try {
//     const input = {
//       Bucket: 'awsd-officialcourse-demo-amazon-s3',
//       Key: key
//     }
//     if(range != undefined) {
//       input['Range'] = range
//     }
//     return await s3.getObject(input);
//     // console.log(util.inspect(response, false, null, true))
//     return response;
//     return content
//   } catch (err) {
//     console.log(util.inspect(err, false, null, true));
//   }
// };