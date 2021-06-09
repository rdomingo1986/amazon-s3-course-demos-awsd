const mergeFiles = require('merge-files');
 
const outputPath = __dirname + '/result.mp4';
 
const inputPathList = [
    __dirname + '/2. Keeping Up To Date.mp4.sf-part1',
    __dirname + '/2. Keeping Up To Date.mp4.sf-part2',
    __dirname + '/2. Keeping Up To Date.mp4.sf-part3',
    __dirname + '/2. Keeping Up To Date.mp4.sf-part4'
];
 
(async function () {
  const status = await mergeFiles(inputPathList, outputPath);
  console.log(status);
})();
