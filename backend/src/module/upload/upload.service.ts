import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/common/prisma/init.prisma';

@Injectable()
export class UploadService {
  constructor(public prisma: PrismaService) {}
  async uploadAvatar(file: Express.Multer.File, req: Request) {
    console.log({ file });
    if (!file) throw new BadRequestException(`Not file`);

    // const isImgLocal = req.user.avatar?.includes(`local`);
    // console.log(isImgLocal);

    await this.prisma.users.update({
      where: {
        userId: +req.user.userId,
      },
      data: {
        avatar: file.filename,
      },
    });

    return `ok`;
  }
}
