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

export async function deleteCloudImage(publicId: string) {
  const data = await cloudinary.uploader.destroy(publicId);

  if (data?.result === `ok`) {
    console.log({ deleted: publicId });
    return true;
  } else {
    console.log(
      `Không thể xóa file ${publicId} trên Cloudinary: ${data?.error.message}`,
    );
    return false;
  }
}

const storageAvatarCloud = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (
    req: Request,
    file: Express.Multer.File,
  ): Promise<UploadApiOptions> => {
    if (req.user.avatar) await deleteCloudImage(req.user.avatar);
    return {
      folder: 'images',
    };
  },
});

export default storageAvatarCloud;
