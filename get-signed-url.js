const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

const util = require('util');

const run = async function () {
  try {
    const client = new S3Client();

    const command = new GetObjectCommand({
      Bucket: 'awsd-officialcourse-demo-amazon-s3',
      Key: process.argv[2]
    });

    const url = await getSignedUrl(client, command, { expiresIn: 30 })

    console.log(url);
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();