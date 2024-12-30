import multer from 'multer';
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import { CLOUDINARY_SECRET_KEY } from '../constant/app.constant';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Request } from 'express';

cloudinary.config({
  cloud_name: 'dsjzgh93p',
  api_key: '614562374816669',
  api_secret: CLOUDINARY_SECRET_KEY,
});

const storageImageCloud = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (
    req: Request,
    file: Express.Multer.File,
  ): Promise<UploadApiOptions> => {
    return {
      folder: 'images',
    };
  },
});

export default storageImageCloud;
