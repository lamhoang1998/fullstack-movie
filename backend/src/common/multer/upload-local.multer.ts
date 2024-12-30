import multer, { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

const imagesDirectory = 'images/';

fs.mkdirSync(imagesDirectory, { recursive: true });

const storageAvatarLocal = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    const userId = req.user.userId.toString();
    console.log({ userId: req.user.userId });
    const existingFiles = fs.readdirSync(imagesDirectory);
    console.log({ existingFiles });
    const userAvatar = existingFiles.find((filename) =>
      filename.startsWith(userId),
    );

    if (userAvatar) {
      const existingFilePath = path.join(imagesDirectory, userAvatar);
      console.log({ existingFilePath });
      fs.unlinkSync(existingFilePath);
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    console.log({ fileExtension });
    const fileName =
      `local` +
      req.user.userId +
      file.fieldname +
      '-' +
      uniqueSuffix +
      fileExtension;
    cb(null, fileName);
  },
});

export default storageAvatarLocal;
