import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import multer, { Multer } from "multer";
import config from '../config';
import fs from 'fs';


cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = (carImage: string, path: string): Promise<Record<string, unknown>> => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        path,
        { public_id: carImage },
        function (error, result) {
          if (error) {
            reject(error);
          }
          resolve(result as UploadApiResponse);
          fs.unlink(path, (err) => {
            if (err) {
              console.log("error from cloudinary:", err);
            } else {
              console.log("File deleted successfully.");
            }
          });
        }
      );
    });
  };
  
  // Multer Storage Configuration
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd() + "/uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });
  
  export const upload: Multer = multer({ storage });