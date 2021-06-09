const splitFile = require('split-file');

const run = async function () {
  const partsList = await splitFile.splitFile(process.argv[2], process.argv[3]);
  console.log(partsList);
}

run();