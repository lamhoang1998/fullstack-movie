import {
  Controller,
  Post,
  Req,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import storageAvatarLocal from 'src/common/multer/upload-local.multer';
import storageAvatarCloud from 'src/common/multer/upload-cloud.multer';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileUploadAvatarDto } from './dto/upload-avatar.dto';

@ApiBearerAuth('bearer-token')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ResponseMessage(`successfully updated avatar locally`)
  @Post(`avatar-local`)
  @UseInterceptors(FileInterceptor('avatar', { storage: storageAvatarLocal }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'upload avatar local',
    type: FileUploadAvatarDto,
  })
  uploadAvatarLocal(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.uploadService.uploadAvatar(file, req);
  }

  @ResponseMessage(`successfully updated avatar to cloud`)
  @Post(`avatar-cloud`)
  @UseInterceptors(FileInterceptor('avatar', { storage: storageAvatarCloud }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'upload avatar cloud',
    type: FileUploadAvatarDto,
  })
  uploadAvatarCloud(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    console.log({ file });
    return this.uploadService.uploadAvatar(file, req);
  }
}
