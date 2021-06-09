const { STS } = require('@aws-sdk/client-sts');

const util = require('util');

module.exports.assumeRole = async function () {
  const sts = new STS();
  try {
    return (await sts.assumeRole({
      RoleArn: 'arn:aws:iam::864613434505:role/awsd-officialcourse-demo-amazon-s3-ROLE',
      RoleSessionName: 'awsd-officialcourse-demo-amazon-s3'
    })).Credentials;
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
}