import { UploadResult } from "../../schemas/cloudinaryResponse";
import cloudinary from "./cloudinaryConfig";

export const uploadFileToCloudinary = async (fileBuffer: Buffer): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto", folder: "images" }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as UploadResult);
        }
      })
      .end(fileBuffer);
  });
};
