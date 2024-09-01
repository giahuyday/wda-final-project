const { S3 } = require("aws-sdk");
const uuid = require("uuid").v4;
require("dotenv").config();

exports.s3Uploadv2 = async (file) => {
  const s3 = new S3();

  const params = file.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
  });
  const result = await Promise.all(
    params.map((param) => s3.upload(param).promise())
  );
  return result;
};
