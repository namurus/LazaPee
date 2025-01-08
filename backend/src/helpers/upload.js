import { v2 as cloud } from 'cloudinary';
import streamifier from 'streamifier';
import 'dotenv/config';

cloud.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_SECRET_KEY,
});
let streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloud.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export default async (buffer) => {
  let result = await streamUpload(buffer);
  return result.url;
};
