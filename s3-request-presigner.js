const { HttpRequest } = require('@aws-sdk/protocol-http');

const { S3RequestPresigner } = require('@aws-sdk/s3-request-presigner');

const { parseUrl } = require('@aws-sdk/url-parser');

const { Hash } = require('@aws-sdk/hash-node');

const { formatUrl } = require('@aws-sdk/util-format-url');

const { assumeRole } = require('./assume-role.js');

const run = async function () {
  const credentials = await assumeRole();
  const s3ObjectUrl = parseUrl(process.argv[2]);
  const presigner = new S3RequestPresigner({
    region: 'us-east-1',
    credentials: {
      accessKeyId: credentials.AccessKeyId,
      secretAccessKey: credentials.SecretAccessKey,
      sessionToken: credentials.SessionToken
    },
    sha256: Hash.bind(null, "sha256")
  });

  const url = await presigner.presign(new HttpRequest(s3ObjectUrl), { expiresIn: 60 });
  console.log("PRESIGNED URL: ", formatUrl(url));
}

run();