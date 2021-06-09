var splitFile = require('split-file');

splitFile.splitFile('0.png', 3, function (err, parts) {
  if (err) return console.log(err);
  console.log(parts);
});