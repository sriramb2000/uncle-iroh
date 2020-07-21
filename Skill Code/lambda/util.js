const AWS = require('aws-sdk');

const s3SigV4Client = new AWS.S3({
    signatureVersion: 'v4',
    region: process.env.S3_PERSISTENCE_REGION
});

module.exports.getS3PreSignedUrl = function getS3PreSignedUrl(s3ObjectKey) {

    const bucketName = process.env.S3_PERSISTENCE_BUCKET;
    const s3PreSignedUrl = s3SigV4Client.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: s3ObjectKey,
        Expires: 60*1 // the Expires is capped for 1 minute
    });
    console.log(`Util.s3PreSignedUrl: ${s3ObjectKey} URL ${s3PreSignedUrl}`);
    return s3PreSignedUrl;

}

module.exports.pickRandom = (arr) => {
    let i = 0;
    while (i === 0) {
        i = Math.floor(Math.random() * arr.length);
    }
    return arr[i];
}

module.exports.listAllKeys = (prefix="Media/", bucket=process.env.S3_PERSISTENCE_BUCKET, out=[]) => new Promise((resolve, reject) => {
    const params = {
        Bucket: bucket,
        Prefix: prefix,
    };
    s3SigV4Client.listObjectsV2(params).promise()
        .then(({Contents}) => {
            out.push(...Contents);
            resolve(out);
        })
        .catch(reject);
    });
