const awsServices = require("./aws.s3.service");

const uploadImage = async (files) => {
  try {
    const result = await awsServices.s3Uploadv2s(files);
    const key_url = result.key.split("/")[1];

    if (key_url === null) {
      res.status(500).json({ message: "Cannot upload to database" });
    } else {
      return key_url;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadImage };
